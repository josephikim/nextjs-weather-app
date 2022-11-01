import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

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

        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

        if (!user) {
          return null
        }

        // If user found, verify password
        const passwordIsValid = true

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
      console.log('jwt token from callback', token)
      console.log('jwt user from callback', user)
      return token
    },

    // @ts-ignore
    async session({ session, token }) {
      session.user = token.user
      console.log('session from callback', session)
      console.log('token from callback', token)
      return session
    },
  },
}

export default NextAuth(authOptions as NextAuthOptions)
