import type { NextPage } from 'next'
import { requireAuth } from 'utils/requireAuth'

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} }
})

const Dashboard: NextPage = () => {
  return <div>Dashboard page hit!</div>
}

export default Dashboard
