import type { NextPage } from 'next'
import { trpc } from 'utils/trpc'
import Link from 'next/link'
import Forecast from 'components/Forecast'
import styles from 'styles/css/HomePage.module.css'

const HomePage: NextPage = () => {
  const { data: location } = trpc.getDefaultLocation.useQuery()
  const fallbackLocation = {
    label: 'San Francisco, US',
    latitude: '37.78',
    longitude: '-122.42',
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p className={styles.title}>
          View current weather conditions and forecasts for any location in the
          world.
        </p>
        <p className={styles.description}>
          To create a dashboard of your favorite locations, please{' '}
          <Link href="/auth">create an account.</Link>
        </p>
        {location ? (
          <Forecast
            label={location.label}
            latitude={location.latitude.toString()}
            longitude={location.longitude.toString()}
          />
        ) : (
          <Forecast
            label={fallbackLocation.label}
            latitude={fallbackLocation.latitude}
            longitude={fallbackLocation.longitude}
          />
        )}
      </main>
    </div>
  )
}

export default HomePage
