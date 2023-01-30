import { z } from 'zod'

export const ForecastHourlyUnitsViewModelSchema = z.object({
  time: z.string(),
  temperature_2m: z.string(),
  weathercode: z.string(),
})

export type ForecastHourlyUnitsViewModel = z.infer<
  typeof ForecastHourlyUnitsViewModelSchema
>
