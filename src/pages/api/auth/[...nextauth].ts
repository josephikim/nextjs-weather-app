import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from 'utils/prisma'
import { verifyPassword } from 'utils/auth'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
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

        if (!passwordIsValid) {
          return null
        } else {
          return {
            email: user.email,
            id: user.id,
          }
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/auth',
  },
  debug: true,
  callbacks: {
    // @ts-ignore
    async session({ session, token }) {
      session.user = token.user
      return session
    },
    // @ts-ignore
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
}

export default NextAuth(authOptions as NextAuthOptions)
