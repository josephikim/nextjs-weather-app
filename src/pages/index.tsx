import { InferGetServerSidePropsType } from 'next'
import { useSession } from 'next-auth/react'
import { trpc } from 'utils/trpc'
import { getWeather } from 'utils/meteo'
import Link from 'next/link'
import styles from 'styles/Home.module.css'

type WeatherData = {
  latitude: number
  longitude: number
}

const Home = ({
  weather,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const hello = trpc.hello.useQuery({ text: 'client' })

  const { data: session } = useSession()

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
  const weatherData: WeatherData = await getWeather('test')

  return {
    props: {
      weather: weatherData,
    },
  }
}

export default Home
