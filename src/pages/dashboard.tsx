import { trpc } from 'utils/trpc'
import { requireAuth } from 'utils/requireAuth'
import ForecastPreview from 'components/ForecastPreview'
import classes from 'styles/sass/DashboardPage.module.scss'

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
        <div className={classes.flexChild} key={item.location.label}>
          <ForecastPreview
            key={item.location.label}
            label={item.location.label}
            latitude={item.location.latitude.toString()}
            longitude={item.location.longitude.toString()}
          />
        </div>
      )
    })
  }
  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <div className={classes.flexContainer}>{jsx}</div>
      </main>
    </div>
  )
}

export default DashboardPage
