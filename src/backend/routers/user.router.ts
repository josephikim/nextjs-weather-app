import { z } from 'zod'
import { Unit } from '@openmeteo/sdk/unit'
import { publicProcedure, protectedProcedure, router } from 'backend/trpc'
import postgresService from 'db/postgres'
import {
  CreateLocationModelSchema,
  DeleteLocationModelSchema,
} from 'models/location'
import { UpdateUserLocationsDisplayOrderModelSchema } from 'models/user'
import { getWeatherData } from 'utils/meteo'
import { cToF, fToC } from 'utils/weather'
import { WeatherApiResponseSchema } from 'schemas/weatherApiResponse'

type SerializedApiResponse = {
  celsius: string
  fahrenheit: string
}

const celsiusUnitValue = Unit['celsius']
const fahrenheitUnitValue = Unit['fahrenheit']

export const userRouter = router({
  getWeather: publicProcedure
    .input(
      z.object({
        latitude: z.string(),
        longitude: z.string(),
      })
    )
    .query(async ({ input }) => {
      const data = await getWeatherData(input.latitude, input.longitude)

      const parsed = WeatherApiResponseSchema.parse(data)
      const queryTemperatureUnit = Unit[parsed.current.temperature2mUnit]

      const response = {} as SerializedApiResponse

      if (queryTemperatureUnit === 'celsius') {
        const fahrenheitData = {
          latitude: parsed.latitude,
          longitude: parsed.longitude,
          current: {
            ...parsed.current,
            temperature2m: cToF(parsed.current.temperature2m),
            temperature2mUnit: fahrenheitUnitValue,
          },
          hourly: {
            ...parsed.hourly,
            temperature2m: parsed.hourly.temperature2m.map((celsius) =>
              cToF(celsius)
            ),
            temperature2mUnit: fahrenheitUnitValue,
          },
          daily: {
            ...parsed.daily,
            temperature2mMax: parsed.daily.temperature2mMax.map((celsius) =>
              cToF(celsius)
            ),
            temperature2mMaxUnit: fahrenheitUnitValue,
            temperature2mMin: parsed.daily.temperature2mMin.map((celsius) =>
              cToF(celsius)
            ),
            temperature2mMinUnit: fahrenheitUnitValue,
          },
        }
        response.celsius = JSON.stringify(parsed)
        response.fahrenheit = JSON.stringify(fahrenheitData)
      } else if (queryTemperatureUnit === 'fahrenheit') {
        const celsiusData = {
          latitude: parsed.latitude,
          longitude: parsed.longitude,
          current: {
            ...parsed.current,
            temperature2m: fToC(parsed.current.temperature2m),
            temperature2mUnit: celsiusUnitValue,
          },
          hourly: {
            ...parsed.hourly,
            temperature2m: parsed.hourly.temperature2m.map((fahrenheit) =>
              fToC(fahrenheit)
            ),
            temperature2mUnit: celsiusUnitValue,
          },
          daily: {
            ...parsed.daily,
            temperature2mMax: parsed.daily.temperature2mMax.map((fahrenheit) =>
              fToC(fahrenheit)
            ),
            temperature2mMaxUnit: celsiusUnitValue,
            temperature2mMin: parsed.daily.temperature2mMin.map((fahrenheit) =>
              fToC(fahrenheit)
            ),
            temperature2mMinUnit: celsiusUnitValue,
          },
        }
        response.fahrenheit = JSON.stringify(parsed)
        response.celsius = JSON.stringify(celsiusData)
      }

      return {
        status: 'success',
        data: response,
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
