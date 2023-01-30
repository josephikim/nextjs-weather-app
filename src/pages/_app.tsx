import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { trpc } from 'utils/trpc'
import { SessionProvider } from 'next-auth/react'
import { LocalDataProvider } from 'hooks/useLocalData'
import Layout from 'components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'styles/css/globals.css'
import 'styles/sass/weather-icons.min.scss'

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session
}>) {
  return (
    <SessionProvider session={session}>
      <LocalDataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LocalDataProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
