import type { NextPage } from 'next'
import { requireAuth } from 'utils/requireAuth'

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} }
})

const Secret: NextPage = () => {
  return <div>Secret page hit!</div>
}

export default Secret
