import type { AppType } from 'next/app'
import { trpc } from 'utils/trpc'
import { SessionProvider } from 'next-auth/react'
import Layout from 'components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'styles/globals.css'

// const MyApp = ({
//   Component,
//   pageProps,
// }: AppProps<{
//   session: Session
// }>) => {
//   return (
//     <SessionProvider session={pageProps.session}>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </SessionProvider>
//   )
// }

const MyApp: AppType = ({ Component, pageProps }) => {
  console.log({ pageProps })
  return (
    //@ts-ignore
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
