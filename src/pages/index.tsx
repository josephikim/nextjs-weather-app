import type { NextPage } from 'next'
import { trpc } from 'utils/trpc'
import Link from 'next/link'
import Forecast from 'components/Forecast'
import styles from 'styles/css/HomePage.module.css'

const HomePage: NextPage = () => {
  const { data: location } = trpc.getUserDefaultLocation.useQuery()

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
          <span>Loading forecast...</span>
        )}
      </main>
    </div>
  )
}

export default HomePage
