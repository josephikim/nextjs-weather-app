import { TRPCError } from '@trpc/server'
import { CreateLocationModel } from 'models/location'
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
    try {
      let location

      if (email === 'guest') {
        // for non-authed user
        location = await prisma.location.findUnique({
          where: { label: 'San Francisco, US' },
        })
      } else {
        // for authed user
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

        if (!user) throw new Error('No user found')

        const locationId = user.locations[0].locationId

        location = await prisma.location.findUnique({
          where: { id: locationId },
        })
      }
      return location
    } catch (e) {
      const message = getErrorMessage(e)
      throw new Error(message)
    }
  }

  async addUserLocation({
    input,
    ctx,
  }: {
    input: CreateLocationModel
    ctx: Context
  }) {
    try {
      const email = ctx.session?.user?.email as string

      // create location and connect to user
      const userLocation = await prisma.location.create({
        data: {
          ...input,
          users: {
            create: {
              user: {
                connect: {
                  email: email,
                },
              },
            },
          },
        },
      })

      return {
        status: 'success',
        data: {
          userLocation,
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
