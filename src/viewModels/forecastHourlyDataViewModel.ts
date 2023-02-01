import { z } from 'zod'

export const ForecastHourlyDataViewModelSchema = z.object({
  time: z.string().array().length(168),
  temperature_2m: z.number().array().length(168),
  relativehumidity_2m: z.number().array().length(168),
  weathercode: z.number().array().length(168),
})

export type ForecastHourlyDataViewModel = z.infer<
  typeof ForecastHourlyDataViewModelSchema
>
