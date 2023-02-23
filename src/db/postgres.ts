import { TRPCError } from '@trpc/server'
import { CreateLocationModel, DeleteLocationModel } from 'models/location'
import { Context } from 'backend/context'
import { Prisma } from '@prisma/client'
import { getErrorMessage } from 'utils/error'
import { hashPassword } from 'utils/auth'
import prisma from 'utils/prisma'

export class PostgresService {
  async createUser(user: Prisma.UserCreateInput) {
    const data = {
      email: user.email,
      password: await hashPassword(user.password),
      locations: {
        create: [
          {
            location: {
              connect: {
                label: 'San Francisco, US',
              },
            },
            displayOrder: 0,
          },
        ],
      },
    }

    try {
      const result = await prisma.user.create({ data })
      return result
    } catch (e) {
      const message = getErrorMessage(e)
      throw new Error(message)
    }
  }

  async getUserDefaultLocation(email: string) {
    let location

    if (email === 'guest') {
      location = await prisma.location.findUnique({
        where: { label: 'San Francisco, US' },
      })
    } else {
      try {
        // lookup user with default location
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
          include: {
            locations: {
              orderBy: [
                {
                  displayOrder: 'asc',
                },
              ],
              take: 1,
            },
          },
        })

        if (!user || user.locations.length === 0) {
          // for non-authed user
          location = await prisma.location.findUnique({
            where: { label: 'San Francisco, US' },
          })
        } else {
          // for authed user
          const locationLabel = user.locations[0].locationLabel

          location = await prisma.location.findUnique({
            where: { label: locationLabel },
          })
        }
        return location
      } catch (e) {
        const message = getErrorMessage(e)
        throw new Error(message)
      }
    }
  }

  async createUserLocation({
    input,
    ctx,
  }: {
    input: CreateLocationModel
    ctx: Context
  }) {
    try {
      const email = ctx.session?.user?.email as string

      // lookup user locations
      const relations = await prisma.locationsOnUser.findMany({
        where: {
          userEmail: email,
        },
        orderBy: [
          {
            displayOrder: 'asc',
          },
        ],
      })

      // update relation table and create location if needed
      const newRelation = await prisma.locationsOnUser.create({
        data: {
          user: {
            connect: {
              email: email,
            },
          },
          location: {
            connectOrCreate: {
              where: {
                label: input.label,
              },
              create: {
                ...input,
              },
            },
          },
          displayOrder:
            relations.length > 0
              ? relations[relations.length - 1].displayOrder + 1
              : 0,
        },
      })

      return {
        status: 'success',
        data: {
          newRelation,
        },
      }
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'A location with that label already exists',
        })
      } else {
        const message = getErrorMessage(e)
        throw new Error(message)
      }
    }
  }

  async deleteUserLocation({
    input,
    ctx,
  }: {
    input: DeleteLocationModel
    ctx: Context
  }) {
    try {
      const email = ctx.session?.user?.email as string

      // delete user location from relation table
      const deleted = await prisma.locationsOnUser.delete({
        where: {
          userEmail_locationLabel: {
            userEmail: email,
            locationLabel: input.label,
          },
        },
      })

      return {
        status: 'success',
        data: {
          deleted,
        },
      }
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'A location with that label already exists',
        })
      } else {
        const message = getErrorMessage(e)
        throw new Error(message)
      }
    }
  }
}

const postgresService = new PostgresService()

export default postgresService
