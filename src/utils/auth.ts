import { hash, compare } from 'bcryptjs'
import { getErrorMessage } from './error'

export async function hashPassword(password: string) {
  try {
    const hashedPassword = await hash(password, 12)
    return hashedPassword
  } catch (e) {
    const message = getErrorMessage(e)
    throw new Error(message)
  }
}

export async function verifyPassword(password: string, hashedPassword: string) {
  try {
    const isValid = await compare(password, hashedPassword)
    return isValid
  } catch (e) {
    const message = getErrorMessage(e)
    throw new Error(message)
  }
}
