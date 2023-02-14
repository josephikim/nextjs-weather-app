import type { NextPage } from 'next'
import Link from 'next/link'
import Forecast from 'components/Forecast'
import styles from 'styles/css/HomePage.module.css'

const HomePage: NextPage = () => {
  const latitude = '37.77'
  const longitude = '-122.42'
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
        <Forecast latitude={latitude} longitude={longitude} />
      </main>
    </div>
  )
}

export default HomePage
