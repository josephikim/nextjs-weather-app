import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from 'utils/prisma'
import { verifyPassword } from 'utils/auth'

export const authOptions = {
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
          return user
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
        token.id = user.id
        token.user = user
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

export default NextAuth(authOptions as NextAuthOptions)
