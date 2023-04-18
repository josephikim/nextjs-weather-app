import { z } from 'zod'

export const ApiResponseViewModelSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  current_weather: z.object({
    temperature: z.number(),
    windspeed: z.number(),
    winddirection: z.number(),
    weathercode: z.number(),
    time: z.string(),
  }),
  hourly_units: z.object({
    time: z.string(),
    temperature_2m: z.string(),
    relativehumidity_2m: z.string(),
    windspeed_10m: z.string(),
    precipitation: z.string(),
  }),
  hourly: z.object({
    time: z.string().array().length(168),
    temperature_2m: z.number().array().length(168),
    relativehumidity_2m: z.number().array().length(168),
    windspeed_10m: z.number().array().length(168),
    precipitation: z.number().array().length(168),
  }),
  daily_units: z.object({
    time: z.string(),
    temperature_2m_min: z.string(),
    temperature_2m_max: z.string(),
    precipitation_sum: z.string(),
    weathercode: z.string(),
  }),
  daily: z.object({
    time: z.string().array().length(7),
    temperature_2m_min: z.number().array().length(7),
    temperature_2m_max: z.number().array().length(7),
    precipitation_sum: z.number().array().length(7),
    weathercode: z.number().array().length(7),
  }),
})

export type ApiResponseViewModel = z.infer<typeof ApiResponseViewModelSchema>
