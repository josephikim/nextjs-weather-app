import { protectedProcedure, router } from 'backend/trpc'
import postgresService from 'db/postgres'
import {
  CreateLocationModelSchema,
  DeleteLocationModelSchema,
} from 'models/location'
import { UpdateUserLocationsDisplayOrderModelSchema } from 'models/user'

export const userRouter = router({
  getLocations: protectedProcedure.query(async ({ ctx }) => {
    return await postgresService.getUserLocations({ ctx })
  }),
  createLocation: protectedProcedure
    .input(CreateLocationModelSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await postgresService.createUserLocation({ input, ctx })
      return {
        status: 'success',
        data: result,
      }
    }),
  deleteLocation: protectedProcedure
    .input(DeleteLocationModelSchema)
    .mutation(async ({ input, ctx }) => {
      await postgresService.deleteUserLocation({ input, ctx })
      return {
        status: 'success',
      }
    }),
  updateLocationsDisplayOrder: protectedProcedure
    .input(UpdateUserLocationsDisplayOrderModelSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await postgresService.updateUserLocationsDisplayOrder({
        input,
        ctx,
      })
      return {
        status: 'success',
        data: result,
      }
    }),
})
