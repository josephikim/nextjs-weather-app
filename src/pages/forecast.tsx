import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { trpc } from 'utils/trpc'
import Forecast from 'components/Forecast'
import AddDashboardItemButton from 'components/AddDashboardItemButton'
import ContentWrapper from 'components/ContentWrapper'
import { SyncLoader } from 'react-spinners'
import classes from 'styles/sass/ForecastPage.module.scss'

const ForecastPage: NextPage = () => {
  const router = useRouter()

  const location = router.query.location?.toString() as string
  const latitude = router.query.latitude?.toString() as string
  const longitude = router.query.longitude?.toString() as string

  const isQueryParamMissing = !location || !latitude || !longitude

  // fetch forecast data
  const { data: { data: forecastData } = {}, status } =
    trpc.user.getWeather.useQuery(
      {
        latitude,
        longitude,
      },
      { enabled: !isQueryParamMissing }
    )

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'

  // fetch user locations
  const { data: { data: locationsOnUser } = {} } =
    trpc.user.getLocations.useQuery()

  let jsx: JSX.Element

  if (isLoading) {
    jsx = (
      <ContentWrapper>
        <SyncLoader
          loading={isLoading}
          aria-label="Loading Spinner"
          color="#36d7b7"
        ></SyncLoader>
      </ContentWrapper>
    )
  } else if (isSuccess && forecastData) {
    // is forecast location in user locations
    const isUserLocation = locationsOnUser?.some(
      (locationOnUser) => locationOnUser.location.label === location
    )
    jsx = (
      <div className={classes.container}>
        <div className={classes.child}>
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
        </div>
      </div>
    )
  } else {
    jsx = <ContentWrapper>Error loading forecast</ContentWrapper>
  }

  return jsx
}

export default ForecastPage
