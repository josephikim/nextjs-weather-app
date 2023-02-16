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
}

const postgresService = new PostgresService()

export default postgresService
