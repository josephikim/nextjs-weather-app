import { publicProcedure, router } from 'backend/trpc'
import postgresService from 'db/postgres'
import { CreateUserModelSchema } from 'models/user'

export const authRouter = router({
  signup: publicProcedure
    .input(CreateUserModelSchema)
    .mutation(async ({ input }) => {
      const user = await postgresService.createUser(input)

      return {
        status: 'success',
        data: {
          email: user.email,
        },
      }
    }),
})
