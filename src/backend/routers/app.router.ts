import { z } from 'zod'
import { publicProcedure, router } from 'backend/trpc'
import { getForecast } from 'utils/meteo'
import { ForecastViewModel } from 'viewModels/forecastViewModel'

export const appRouter = router({
  getForecast: publicProcedure
    .input(
      z.object({
        coordinates: z.string(),
      })
    )
    .query(async ({ input }) => {
      const response = await getForecast('test')
      const forecastJson: ForecastViewModel = await response.json()

      return forecastJson
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
