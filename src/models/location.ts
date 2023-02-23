import { z } from 'zod'

export const CreateLocationModelSchema = z.object({
  label: z.string(),
  latitude: z.string(),
  longitude: z.string(),
})

export const DeleteLocationModelSchema = z.object({
  label: z.string(),
})

export type CreateLocationModel = z.infer<typeof CreateLocationModelSchema>
export type DeleteLocationModel = z.infer<typeof DeleteLocationModelSchema>
