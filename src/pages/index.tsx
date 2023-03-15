import type { NextPage } from 'next'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { trpc } from 'utils/trpc'
import Forecast from 'components/Forecast'
import AlertDismissible from 'components/AlertDismissible'
import styles from 'styles/css/HomePage.module.css'

const HomePage: NextPage = () => {
  const { data: session } = useSession()
  const isAuthed = !!session?.user.id

  const { data: { data: defaultLocation } = {} } =
    trpc.getDefaultLocation.useQuery()
  // Enable this query only when user is authed
  const { data: { data: userLocations } = {} } =
    trpc.user.getLocations.useQuery(undefined, { enabled: isAuthed })

  let jsx: JSX.Element = <span>Loading forecast...</span>

  // Forecast with default location (un-authed)
  if (defaultLocation)
    jsx = (
      <Forecast
        label={defaultLocation.label}
        latitude={defaultLocation.latitude.toString()}
        longitude={defaultLocation.longitude.toString()}
      />
    )

  // Forecast with user location (authed)
  if (userLocations && userLocations.length > 0) {
    const location = userLocations.filter(
      (object) => object.isUserDefault === true
    )[0].location

    jsx = (
      <Forecast
        label={location.label}
        latitude={location.latitude.toString()}
        longitude={location.longitude.toString()}
      />
    )
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <AlertDismissible variant="info">
          <span>
            View live weather conditions for any city in the world. To create a
            dashboard of your favorite locations, please{' '}
            <Link href="/auth">create an account.</Link>
          </span>
        </AlertDismissible>
        {jsx}
      </main>
    </div>
  )
}

export default HomePage
