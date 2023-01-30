import type { NextPage } from 'next'
import Link from 'next/link'
import Forecast from 'components/Forecast'
import styles from 'styles/css/Home.module.css'

const Home: NextPage = () => {
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
        <Forecast location="default" />
      </main>
    </div>
  )
}

export default Home
