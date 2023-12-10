import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { trpc } from 'utils/trpc'
import Forecast from 'components/Forecast'
import AddDashboardItemButton from 'components/AddDashboardItemButton'
import classes from 'styles/sass/ForecastPage.module.scss'

const ForecastPage: NextPage = () => {
  const router = useRouter()

  const location = router.query.location?.toString() as string
  const latitude = router.query.latitude?.toString() as string
  const longitude = router.query.longitude?.toString() as string

  const isQueryParamMissing = !location || !latitude || !longitude

  // fetch forecast data
  const { data: { data: forecastData } = {} } = trpc.user.getWeather.useQuery(
    {
      latitude,
      longitude,
    },
    { enabled: !isQueryParamMissing }
  )

  // fetch user locations
  const { data: { data: locationsOnUser } = {} } =
    trpc.user.getLocations.useQuery()

  let jsx: JSX.Element

  // If no forecast data, return early
  if (!forecastData) {
    jsx = <div>Loading forecast...</div>
  } else {
    // is forecast location in user locations
    const isUserLocation = locationsOnUser?.some(
      (locationOnUser) => locationOnUser.location.label === location
    )
    jsx = (
      <>
        <span className={classes.title}>Current forecast for {location}</span>
        <span>
          <AddDashboardItemButton
            location={location}
            latitude={latitude}
            longitude={longitude}
            isAdded={!!isUserLocation}
          />
        </span>
        <Forecast data={forecastData} />
      </>
    )
  }

  return (
    <div className={classes.container}>
      <div className={classes.child}>{jsx}</div>
    </div>
  )
}

export default ForecastPage
