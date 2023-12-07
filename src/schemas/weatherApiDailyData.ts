import { z } from 'zod'

export const WeatherApiDailyDataSchema = z.object({
  time: z.string().datetime().array().length(7),
  weatherCode: z.number().array().length(7),
  weatherCodeUnit: z.number(),
  temperature2mMax: z.number().array().length(7),
  temperature2mMaxUnit: z.number(),
  temperature2mMin: z.number().array().length(7),
  temperature2mMinUnit: z.number(),
  precipitationSum: z.number().array().length(7),
  precipitationSumUnit: z.number(),
  windSpeed10mMax: z.number().array().length(7),
  windSpeed10mMaxUnit: z.number(),
  windDirection10mDominant: z.number().array().length(7),
  windDirection10mDominantUnit: z.number(),
})

export type WeatherApiDailyData = z.infer<typeof WeatherApiDailyDataSchema>
