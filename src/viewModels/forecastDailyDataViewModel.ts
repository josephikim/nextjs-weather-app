import { z } from 'zod'

export const ForecastDailyDataViewModelSchema = z.object({
  time: z.string().array().length(7),
  temperature_2m_min: z.number().array().length(7),
  temperature_2m_max: z.number().array().length(7),
  weathercode: z.number().array().length(7),
})

export type ForecastDailyDataViewModel = z.infer<
  typeof ForecastDailyDataViewModelSchema
>
