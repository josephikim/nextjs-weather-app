import type { NextPage } from 'next'
import { requireAuth } from 'utils/requireAuth'

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} }
})

const DashboardPage: NextPage = () => {
  return <div>Dashboard Page page hit!</div>
}

export default DashboardPage
