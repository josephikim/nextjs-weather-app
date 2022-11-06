import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from 'backend/routers/_app'
import { createContext } from 'backend/context'

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
