import { getErrorMessage } from 'utils/error'
import { hashPassword } from 'utils/auth'
import prisma from 'prisma/client'
import { IUserCredentials } from 'types'

export class PostgresService {
  async createUser(newUser: IUserCredentials) {
    const data = {
      email: newUser.email,
      password: await hashPassword(newUser.password),
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
