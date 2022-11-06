import { inferAsyncReturnType } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { getSession } from 'next-auth/react'
import prisma from 'utils/prisma'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const session = await getSession({ req: opts.req })

  return {
    session,
    prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
