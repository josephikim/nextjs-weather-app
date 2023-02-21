import { ApiResponseViewModelSchema } from 'viewModels/meteo'
import { z } from 'zod'
import { publicProcedure, protectedProcedure, router } from 'backend/trpc'
import { getForecast } from 'utils/meteo'
import postgresService from 'db/postgres'
import { CreateLocationModelSchema } from 'models/location'

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
      return ApiResponseViewModelSchema.parse(forecast)
    }),
  getUserDefaultLocation: publicProcedure.query(async ({ ctx }) => {
    const email = ctx.session?.user?.email ?? 'guest'
    const location = await postgresService.getUserDefaultLocation(email)
    return location
  }),
  addUserLocation: protectedProcedure
    .input(CreateLocationModelSchema)
    .mutation(({ input, ctx }) => {
      return postgresService.addUserLocation({ input, ctx })
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
