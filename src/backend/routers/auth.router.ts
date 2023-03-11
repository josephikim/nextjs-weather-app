import { publicProcedure, router } from 'backend/trpc'
import postgresService from 'db/postgres'
import { UserCredentialsInputSchema } from 'models/user'

export const authRouter = router({
  signup: publicProcedure
    .input(UserCredentialsInputSchema)
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
