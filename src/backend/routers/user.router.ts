import { ApiResponseViewModelSchema } from 'viewModels/meteo'
import { z } from 'zod'
import { publicProcedure, protectedProcedure, router } from 'backend/trpc'
import postgresService from 'db/postgres'
import {
  CreateLocationModelSchema,
  DeleteLocationModelSchema,
} from 'models/location'
import { getForecastData } from 'utils/meteo'

export const userRouter = router({
  getForecast: publicProcedure
    .input(
      z.object({
        latitude: z.string(),
        longitude: z.string(),
        temperatureUnit: z.string(),
      })
    )
    .query(async ({ input }) => {
      const forecast = await getForecastData(
        input.latitude,
        input.longitude,
        input.temperatureUnit
      )
      const parsed = ApiResponseViewModelSchema.parse(forecast)

      return {
        status: 'success',
        data: parsed,
      }
    }),
  getLocations: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id as string

    if (!userId) {
      return {
        status: 'failed',
        message: 'user not authorized',
        data: [],
      }
    }
    const locations = await postgresService.getUserLocations({ ctx })
    return {
      status: 'success',
      data: locations,
    }
  }),
  createLocation: protectedProcedure
    .input(CreateLocationModelSchema)
    .mutation(({ input, ctx }) => {
      const location = postgresService.createUserLocation({ input, ctx })
      return {
        status: 'success',
        data: location,
      }
    }),
  deleteLocation: protectedProcedure
    .input(DeleteLocationModelSchema)
    .mutation(({ input, ctx }) => {
      const deleted = postgresService.deleteUserLocation({ input, ctx })
      return {
        status: 'success',
        data: deleted,
      }
    }),
})
