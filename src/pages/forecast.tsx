import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import type { NextPage } from 'next'
import { SyncLoader } from 'react-spinners'
import { trpc } from 'utils/trpc'
import Forecast from 'components/Forecast'
import AddDashboardItemButton from 'components/AddDashboardItemButton'
import ContentWrapper from 'components/ContentWrapper'
import classes from 'styles/sass/ForecastPage.module.scss'

const ForecastPage: NextPage = () => {
  const router = useRouter()
  const { status } = useSession()
  const isAuthed = status === 'authenticated'
  const location = router.query.location?.toString() as string
  const latitude = router.query.latitude?.toString() as string
  const longitude = router.query.longitude?.toString() as string
  const isQueryParamMissing = !location || !latitude || !longitude

  // fetch user locations
  const { data: locationsOnUser } = trpc.user.getLocations.useQuery(undefined, {
    enabled: isAuthed,
  })

  // fetch forecast data
  const { data: forecastData, status: forecastDataStatus } =
    trpc.getWeather.useQuery(
      {
        latitude,
        longitude,
      },
      { enabled: !isQueryParamMissing }
    )

  const isLoading = forecastDataStatus === 'loading'
  const isSuccess = forecastDataStatus === 'success'
  const isError = forecastDataStatus === 'error'

  let jsx: JSX.Element

  if (isError) {
    jsx = <ContentWrapper>Error loading forecast</ContentWrapper>
  } else if (isSuccess && forecastData) {
    // check if user has saved location
    const isUserLocation =
      locationsOnUser?.some(
        (locationOnUser) => locationOnUser.location.label === location
      ) || false

    jsx = (
      <div className={classes.container}>
        <div className={classes.child}>
          <span className={classes.title}>Current forecast for {location}</span>
          <span>
            <AddDashboardItemButton
              location={location}
              latitude={latitude}
              longitude={longitude}
              isAdded={isUserLocation}
            />
          </span>
          <Forecast data={forecastData} />
        </div>
      </div>
    )
  } else {
    jsx = (
      <ContentWrapper>
        <SyncLoader
          loading={isLoading}
          aria-label="Loading Spinner"
          color="#36d7b7"
        ></SyncLoader>
      </ContentWrapper>
    )
  }

  return jsx
}

export default ForecastPage
