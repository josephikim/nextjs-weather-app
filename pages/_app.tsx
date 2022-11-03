import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from 'components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
