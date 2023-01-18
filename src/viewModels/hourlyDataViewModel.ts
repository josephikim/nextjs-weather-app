import { z } from 'zod'

export const HourlyDataViewModelSchema = z.object({
  time: z.string().array().length(168),
  temperature_2m: z.number().array().length(168),
  weathercode: z.number().array().length(168),
})

export type HourlyDataViewModel = z.infer<typeof HourlyDataViewModelSchema>
