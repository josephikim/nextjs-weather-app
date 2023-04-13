import { z, string, number } from 'zod'

export const CreateUserModelSchema = z.object({
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
  password: string({ required_error: 'Password is required' }).min(
    4,
    'Password must be more than 4 characters'
  ),
})

export const LoginUserModelSchema = z.object({
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
  password: string({ required_error: 'Password is required' }).min(
    4,
    'Password must be more than 4 characters'
  ),
})

export const UpdateUserLocationsDisplayOrderModelSchema = z.array(
  z.object({
    locationId: string(),
    displayOrder: number(),
  })
)

export type CreateUserModel = z.infer<typeof CreateUserModelSchema>
export type LoginUserModel = z.infer<typeof LoginUserModelSchema>
export type UpdateUserLocationsDisplayOrderModel = z.infer<
  typeof UpdateUserLocationsDisplayOrderModelSchema
>
