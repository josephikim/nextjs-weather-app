import { trpc } from 'utils/trpc'
import { requireAuth } from 'utils/requireAuth'
import ForecastPreview from 'components/ForecastPreview'

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} }
})

const DashboardPage = () => {
  const { data } = trpc.user.getLocations.useQuery()
  const locations = data?.data

  let jsx: React.ReactElement | React.ReactElement[] = (
    <div>Loading dashboard...</div>
  )

  if (locations) {
    jsx = locations.map((item) => {
      return (
        <ForecastPreview
          key={item.location.label}
          label={item.location.label}
          latitude={item.location.latitude.toString()}
          longitude={item.location.longitude.toString()}
        />
      )
    })
  }
  return jsx
}

export default DashboardPage
