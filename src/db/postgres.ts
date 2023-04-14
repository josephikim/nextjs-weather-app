import { TRPCError } from '@trpc/server'
import { DeleteLocationModel } from 'models/location'
import { Context } from 'backend/context'
import { LocationsOnUser, Prisma } from '@prisma/client'
import { getErrorMessage } from 'utils/error'
import { hashPassword } from 'utils/auth'
import prisma from 'utils/prisma'

export class PostgresService {
  async createUser(user: Prisma.UserCreateInput) {
    const exists = await prisma.user.findFirst({
      where: { email: user.email },
    })

    if (exists) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'User already exists.',
      })
    }

    const data = {
      email: user.email,
      password: await hashPassword(user.password),
      locations: {
        create: [
          {
            location: {
              connect: {
                label: process.env.NEXT_PUBLIC_APP_DEFAULT_LOCATION,
              },
            },
            displayOrder: 0,
            isUserDefault: true,
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

  async getDefaultLocation() {
    try {
      const label = process.env.NEXT_PUBLIC_APP_DEFAULT_LOCATION
      const location = await prisma.location.findFirst({
        where: { label: label },
      })

      return location
    } catch (e: any) {
      const message = getErrorMessage(e)
      throw new Error(message)
    }
  }

  async getUserLocations({ ctx }: { ctx: Context }) {
    try {
      const userLocations = await lookupUserLocations(ctx)
      return userLocations
    } catch (e: any) {
      const message = getErrorMessage(e)
      throw new Error(message)
    }
  }

  async createUserLocation({
    input,
    ctx,
  }: {
    input: Prisma.LocationCreateInput
    ctx: Context
  }) {
    try {
      const userLocations = await lookupUserLocations(ctx)

      // check for matching location
      const matchingLocation = userLocations.some((userLocation) => {
        userLocation.location.label === input.label
      })

      if (matchingLocation) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'A location with that label already exists',
        })
      } else {
        const result = await prisma.locationsOnUser.create({
          data: {
            user: {
              connect: {
                id: ctx.session?.user?.id,
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
            displayOrder: userLocations.length,
          },
        })

        return result
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
      const userLocations = await lookupUserLocations(ctx)

      if (userLocations.length == 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Requested data not found',
        })
      }

      // Keep at least one user location
      if (userLocations.length === 1) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'That data cannot be deleted',
        })
      } else {
        // deletion target
        const relation = userLocations.find(
          (relation) => relation.location.label === input.label
        )

        if (!relation) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Requested data not found',
          })
        }

        // build prisma transaction
        const ops = []

        // add deletion op
        ops.push(
          prisma.locationsOnUser.delete({
            where: {
              userId_locationId: {
                userId: ctx.session?.user?.id as string,
                locationId: relation.location.id,
              },
            },
          })
        )

        // add update op for new default location
        if (relation.isUserDefault === true) {
          ops.push(
            prisma.locationsOnUser.update({
              where: {
                userId_locationId: {
                  userId: ctx.session?.user?.id as string,
                  locationId: userLocations[1].locationId,
                },
              },
              data: {
                isUserDefault: true,
              },
            })
          )
        }

        const deletionIndex = userLocations.findIndex(
          (element) => element.locationId === relation.locationId
        )

        userLocations.forEach((element, i) => {
          if (i < deletionIndex + 1) return

          // add update ops for display order
          ops.push(
            prisma.locationsOnUser.update({
              where: {
                userId_locationId: {
                  userId: ctx.session?.user?.id as string,
                  locationId: element.locationId,
                },
              },
              data: {
                displayOrder: i - 1,
              },
            })
          )
        })

        // run transaction
        await prisma.$transaction(ops)
      }
    } catch (e: any) {
      const message = getErrorMessage(e)
      throw new Error(message)
    }
  }
}

const lookupUserLocations = async (ctx: Context) => {
  const result = await prisma.locationsOnUser.findMany({
    where: {
      userId: ctx.session?.user?.id as string,
    },
    include: {
      location: true,
    },
    orderBy: [
      {
        displayOrder: 'asc',
      },
    ],
  })
  return result
}

const postgresService = new PostgresService()

export default postgresService
