import { z } from 'zod'
import { publicProcedure, router } from 'backend/trpc'
import { getForecast } from 'utils/meteo'

export const appRouter = router({
  getForecast: publicProcedure
    .input(
      z.object({
        coordinates: z.string(),
      })
    )
    .query(async ({ input }) => {
      const forecast = await getForecast('test')
      return forecast
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
