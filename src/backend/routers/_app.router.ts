import prisma from 'utils/prisma'
import { router, publicProcedure } from 'backend/trpc'
import { authRouter } from './auth.router'
import { userRouter } from './user.router'

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  getDefaultLocation: publicProcedure.query(async () => {
    const label = process.env.NEXT_PUBLIC_APP_DEFAULT_LOCATION

    const location = await prisma.location.findFirst({
      where: { label: label },
    })

    return {
      status: 'success',
      data: location,
    }
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
