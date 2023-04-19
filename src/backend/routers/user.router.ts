import { z } from 'zod'
import { publicProcedure, protectedProcedure, router } from 'backend/trpc'
import postgresService from 'db/postgres'
import { getForecastData } from 'utils/meteo'
import {
  CreateLocationModelSchema,
  DeleteLocationModelSchema,
} from 'models/location'
import { UpdateUserLocationsDisplayOrderModelSchema } from 'models/user'
import { ForecastApiResponseViewModelSchema } from 'viewModels/forecastApiResponseViewModel'

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
      const parsed = ForecastApiResponseViewModelSchema.parse(forecast)

      return {
        status: 'success',
        data: parsed,
      }
    }),
  getLocations: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id as string

    if (!userId) {
      return {
        status: 'success',
        data: [],
      }
    } else {
      const result = await postgresService.getUserLocations({ ctx })
      return {
        status: 'success',
        data: result,
      }
    }
  }),
  createLocation: protectedProcedure
    .input(CreateLocationModelSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await postgresService.createUserLocation({ input, ctx })
      return {
        status: 'success',
        data: result,
      }
    }),
  deleteLocation: protectedProcedure
    .input(DeleteLocationModelSchema)
    .mutation(async ({ input, ctx }) => {
      await postgresService.deleteUserLocation({ input, ctx })
      return {
        status: 'success',
      }
    }),
  updateLocationsDisplayOrder: protectedProcedure
    .input(UpdateUserLocationsDisplayOrderModelSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await postgresService.updateUserLocationsDisplayOrder({
        input,
        ctx,
      })
      return {
        status: 'success',
        data: result,
      }
    }),
})
