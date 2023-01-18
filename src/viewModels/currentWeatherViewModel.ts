import { z } from 'zod'

export const CurrentWeatherViewModelSchema = z.object({
  temperature: z.number(),
  windspeed: z.number(),
  winddirection: z.number(),
  weathercode: z.number(),
  time: z.string(),
})

export type CurrentWeatherViewModel = z.infer<
  typeof CurrentWeatherViewModelSchema
>
