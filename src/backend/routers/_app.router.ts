import { router, publicProcedure } from 'backend/trpc'
import { authRouter } from './auth.router'
import { userRouter } from './user.router'
import postgresService from 'db/postgres'

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  getDefaultLocation: publicProcedure.query(async () => {
    const result = await postgresService.getDefaultLocation()
    return {
      status: 'success',
      data: result,
    }
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
