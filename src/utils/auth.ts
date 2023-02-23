import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from 'utils/prisma'
import { hash, compare } from 'bcryptjs'
import { getErrorMessage } from './error'

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@test.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      // @ts-ignore
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error('Invalid credentials')
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          })

          if (!user) {
            return null
          }

          // If user found, verify password
          const passwordIsValid = await verifyPassword(
            credentials.password,
            user.password
          )

          if (!passwordIsValid) return null

          return user
        } catch {
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth',
  },
  debug: true,
  callbacks: {
    // @ts-ignore
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
      }
      return token
    },
    // @ts-ignore
    async session({ session, token }) {
      if (token) {
        session.id = token.id
      }
      return session
    },
  },
}

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
