import { z, string } from 'zod'

export const UserCredentialsInputSchema = z.object({
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
  password: string({ required_error: 'Password is required' }).min(
    4,
    'Password must be more than 4 characters'
  ),
})

export type UserCredentialsInput = z.infer<typeof UserCredentialsInputSchema>
