import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from 'prisma/client'
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
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 60 * 60 * 24 * 2, // token duration in seconds
  },
  pages: {
    signIn: '/auth',
  },
  debug: true,
  callbacks: {
    // @ts-ignore
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },

    // @ts-ignore
    async session({ session, token }) {
      session.user = token.user
      return session
    },
  },
}

export default NextAuth(authOptions as NextAuthOptions)
