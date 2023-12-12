import { z } from 'zod'

export const WeatherApiCurrentDataSchema = z.object({
  time: z.string().datetime(),
  temperature2m: z.number(),
  temperature2mUnit: z.number(),
  relativeHumidity2m: z.number(),
  relativeHumidity2mUnit: z.number(),
  weatherCode: z.number(),
  weatherCodeUnit: z.number(),
  windSpeed10m: z.number(),
  windSpeed10mUnit: z.number(),
  windDirection10m: z.number(),
  windDirection10mUnit: z.number(),
})

export type WeatherApiCurrentData = z.infer<typeof WeatherApiCurrentDataSchema>
