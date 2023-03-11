import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from 'backend/routers/_app.router'
import { createContext } from 'backend/context'

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // send to bug reporting
      console.error('Something went wrong', error)
    } else {
      console.error({ error })
    }
  },
})
