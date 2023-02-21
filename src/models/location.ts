import { z } from 'zod'

export const CreateLocationModelSchema = z.object({
  label: z.string(),
  latitude: z.string(),
  longitude: z.string(),
})

export type CreateLocationModel = z.infer<typeof CreateLocationModelSchema>
