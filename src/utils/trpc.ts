import type { AppRouter } from 'backend/routers/_app.router'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === 'development' &&
              typeof window !== 'undefined') ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      /**
       * @link https://tanstack.com/query/v4/docs/reference/QueryClient
       **/
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 10 * (60 * 1000),
            cacheTime: 10 * (60 * 1000),
          },
        },
      },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
})
// => { useQuery: ..., useMutation: ...}
