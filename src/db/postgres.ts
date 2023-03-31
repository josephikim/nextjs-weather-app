import { TRPCError } from '@trpc/server'
import { DeleteLocationModel } from 'models/location'
import { Context } from 'backend/context'
import { Prisma } from '@prisma/client'
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
                label: 'San Francisco, US',
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
      const userId = ctx.session?.user?.id as string

      // lookup user locations
      const userLocations = await prisma.locationsOnUser.findMany({
        where: {
          userId: userId,
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
      const userId = ctx.session?.user?.id as string

      // lookup user locations
      const userLocations = await prisma.locationsOnUser.findMany({
        where: {
          userId: userId,
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
        // create new relation and connect or create location
        const result = await prisma.locationsOnUser.create({
          data: {
            user: {
              connect: {
                id: userId,
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
              userLocations.length > 0
                ? userLocations[userLocations.length - 1].displayOrder + 1
                : 0,
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
      const userId = ctx.session?.user?.id as string

      // lookup location
      const location = await prisma.location.findUniqueOrThrow({
        where: { label: input.label },
      })

      const userLocation = await prisma.locationsOnUser.findUniqueOrThrow({
        where: {
          userId_locationId: {
            userId: userId,
            locationId: location.id,
          },
        },
      })

      if (userLocation?.isUserDefault) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'That data cannot be deleted',
        })
      }

      // delete user location
      const deleted = await prisma.locationsOnUser.delete({
        where: {
          userId_locationId: {
            userId: userId,
            locationId: location.id,
          },
        },
      })

      return deleted
    } catch (e: any) {
      const message = getErrorMessage(e)
      throw new Error(message)
    }
  }
}

const postgresService = new PostgresService()

export default postgresService
