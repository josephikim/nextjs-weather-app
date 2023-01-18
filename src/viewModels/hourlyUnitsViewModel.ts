import { z } from 'zod'

export const HourlyUnitsViewModelSchema = z.object({
  time: z.string(),
  temperature_2m: z.string(),
  weathercode: z.string(),
})

export type HourlyUnitsViewModel = z.infer<typeof HourlyUnitsViewModelSchema>
