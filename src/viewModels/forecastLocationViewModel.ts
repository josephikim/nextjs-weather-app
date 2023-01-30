import { z } from 'zod'

export const ForecastLocationViewModelSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
})

export type ForecastLocationViewModel = z.infer<
  typeof ForecastLocationViewModelSchema
>
