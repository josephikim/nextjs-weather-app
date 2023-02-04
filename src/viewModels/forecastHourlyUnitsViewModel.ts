import { z } from 'zod'

export const ForecastHourlyUnitsViewModelSchema = z.object({
  time: z.string(),
  temperature_2m: z.string(),
  relativehumidity_2m: z.string(),
  windspeed_10m: z.string(),
  precipitation: z.string(),
})

export type ForecastHourlyUnitsViewModel = z.infer<
  typeof ForecastHourlyUnitsViewModelSchema
>
