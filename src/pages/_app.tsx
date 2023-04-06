import type { AppProps } from 'next/app'
import { trpc } from 'utils/trpc'
import { SessionProvider } from 'next-auth/react'
import { LocalDataProvider } from 'hooks/useLocalData'
import Layout from 'components/Layout'
import { ProtectedLayout } from 'components/ProtectedLayout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'styles/css/globals.css'
import 'styles/sass/weather-icons.min.scss'

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <LocalDataProvider>
        <Layout>
          {Component.requireAuth ? (
            <ProtectedLayout>
              <Component {...pageProps} />
            </ProtectedLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </LocalDataProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
