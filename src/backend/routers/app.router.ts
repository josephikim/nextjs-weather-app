import { ApiResponseModelSchema } from 'models/meteo'
import { z } from 'zod'
import { publicProcedure, router } from 'backend/trpc'
import { getForecast } from 'utils/meteo'
import postgresService from 'db/postgres'

export const appRouter = router({
  getForecast: publicProcedure
    .input(
      z.object({
        latitude: z.string(),
        longitude: z.string(),
        temperatureUnit: z.string(),
      })
    )
    .query(async ({ input }) => {
      const forecast = await getForecast(
        input.latitude,
        input.longitude,
        input.temperatureUnit
      )
      return ApiResponseModelSchema.parse(forecast)
    }),
  getDefaultLocation: publicProcedure.query(async ({ ctx }) => {
    const email = ctx.session?.user?.email ?? 'guest'
    const location = await postgresService.getDefaultLocation(email)
    return location
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
