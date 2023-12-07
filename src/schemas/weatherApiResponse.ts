import { z } from 'zod'
import { WeatherApiCurrentDataSchema } from 'schemas/weatherApiCurrentData'
import { WeatherApiHourlyDataSchema } from 'schemas/weatherApiHourlyData'
import { WeatherApiDailyDataSchema } from 'schemas/weatherApiDailyData'

export const WeatherApiResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  current: WeatherApiCurrentDataSchema,
  hourly: WeatherApiHourlyDataSchema,
  daily: WeatherApiDailyDataSchema,
})

export type WeatherApiResponse = z.infer<typeof WeatherApiResponseSchema>
