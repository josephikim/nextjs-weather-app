import { z } from 'zod'

export const ForecastCurrentWeatherViewModelSchema = z.object({
  temperature: z.number(),
  windspeed: z.number(),
  winddirection: z.number(),
  weathercode: z.number(),
  time: z.string(),
})

export type ForecastCurrentWeatherViewModel = z.infer<
  typeof ForecastCurrentWeatherViewModelSchema
>
