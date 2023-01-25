import type { AppProps } from 'next/app'
import { Session } from 'next-auth'
import { trpc } from 'utils/trpc'
import { SessionProvider } from 'next-auth/react'
import { UserSettingsProvider } from 'hooks/useUserSettings'
import Layout from 'components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'styles/css/globals.css'
import 'styles/sass/weather-icons.min.scss'

function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <UserSettingsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserSettingsProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
