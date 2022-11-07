import type { AppProps } from 'next/app'
import { Session } from 'next-auth'
import { trpc } from 'utils/trpc'
import { SessionProvider } from 'next-auth/react'
import Layout from 'components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'styles/globals.css'

function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
