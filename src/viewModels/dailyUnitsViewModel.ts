import { z } from 'zod'

export const DailyUnitsViewModelSchema = z.object({
  time: z.string(),
  temperature_2m_min: z.string(),
  temperature_2m_max: z.string(),
  weathercode: z.string(),
})

export type DailyUnitsViewModel = z.infer<typeof DailyUnitsViewModelSchema>
