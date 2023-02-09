import { z } from 'zod'

export const ForecastHourlyDataViewModelSchema = z.object({
  time: z.date().array().length(168),
  temperature_2m: z.number().array().length(168),
  relativehumidity_2m: z.number().array().length(168),
  windspeed_10m: z.number().array().length(168),
  precipitation: z.number().array().length(168),
})

export type ForecastHourlyDataViewModel = z.infer<
  typeof ForecastHourlyDataViewModelSchema
>
