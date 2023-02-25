import { trpc } from 'utils/trpc'
import { Card } from 'react-bootstrap'
import { requireAuth } from 'utils/requireAuth'

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} }
})

const DashboardPage = () => {
  const { data } = trpc.getUserLocations.useQuery()
  const locations = data?.data.locations
  let jsx: React.ReactElement | React.ReactElement[] = (
    <div>Dashboard Page page hit!</div>
  )

  if (locations) {
    jsx = locations.map((item) => {
      return (
        <Card key={item.location.label}>
          <Card.Body>
            <Card.Title>{item.location.label}</Card.Title>
          </Card.Body>
        </Card>
      )
    })
  }
  return jsx
}

export default DashboardPage
