import { z } from 'zod'

export const WeatherApiHourlyDataSchema = z.object({
  time: z.string().datetime().array().length(168),
  temperature2m: z.number().array().length(168),
  temperature2mUnit: z.number(),
  relativeHumidity2m: z.number().array().length(168),
  relativeHumidity2mUnit: z.number(),
  precipitation: z.number().array().length(168),
  precipitationUnit: z.number(),
  windSpeed10m: z.number().array().length(168),
  windSpeed10mUnit: z.number(),
  windDirection10m: z.number().array().length(168),
  windDirection10mUnit: z.number(),
})

export type WeatherApiHourlyData = z.infer<typeof WeatherApiHourlyDataSchema>
