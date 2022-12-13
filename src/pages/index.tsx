import { InferGetServerSidePropsType } from 'next'
import { trpc } from 'utils/trpc'
import { getWeather } from 'utils/meteo'
import Link from 'next/link'
import CurrentWeather from 'components/CurrentWeather'
import styles from 'styles/css/Home.module.css'

const Home = ({
  weather,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const hello = trpc.hello.useQuery({ text: 'client' })

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
        <CurrentWeather data={'hello'} />
        {hello.data && (
          <div>
            <p>{hello.data.greeting}</p>
          </div>
        )}
        {weather && (
          <div>
            <p>weather loaded</p>
            <p>latitude: {weather.latitude}</p>
            <p>longitude: {weather.longitude}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const weatherData = await getWeather('test')

  return {
    props: {
      weather: weatherData,
    },
  }
}

export default Home
