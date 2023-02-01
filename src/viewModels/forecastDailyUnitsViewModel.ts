import { z } from 'zod'

export const ForecastDailyUnitsViewModelSchema = z.object({
  time: z.string(),
  temperature_2m_min: z.string(),
  temperature_2m_max: z.string(),
  precipitation_sum: z.string(),
  weathercode: z.string(),
})

export type ForecastDailyUnitsViewModel = z.infer<
  typeof ForecastDailyUnitsViewModelSchema
>
