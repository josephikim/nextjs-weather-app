import type { NextPage } from 'next'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { trpc } from 'utils/trpc'
import Forecast from 'components/Forecast'
import AlertDismissible from 'components/AlertDismissible'
import classes from 'styles/css/HomePage.module.css'

const HomePage: NextPage = () => {
  const { data: session } = useSession()
  const utils = trpc.useContext()
  const isAuthed = !!session?.user.id

  const { data: { data: defaultLocation } = {} } =
    trpc.getDefaultLocation.useQuery()

  const { data: { data: locations } = {} } = trpc.user.getLocations.useQuery()

  useEffect(() => {
    utils.user.getLocations.invalidate()
  }, [])

  let jsx: JSX.Element

  if (!defaultLocation) {
    jsx = <span>Loading forecast...</span>
  } else {
    // Load user default location
    if (locations && locations.length > 0) {
      const userDefaultLocation = locations.filter(
        (object) => object.isUserDefault === true
      )[0].location

      jsx = (
        <Forecast
          label={userDefaultLocation.label}
          latitude={userDefaultLocation.latitude.toString()}
          longitude={userDefaultLocation.longitude.toString()}
        />
      )
    } else {
      // Load fallback location
      jsx = (
        <Forecast
          label={defaultLocation.label}
          latitude={defaultLocation.latitude.toString()}
          longitude={defaultLocation.longitude.toString()}
        />
      )
    }
  }

  return (
    <div className={classes.container}>
      <main className={classes.main}>
        {!isAuthed && (
          <AlertDismissible variant="info">
            <span>
              Search live weather conditions for any city in the world. To
              create a dashboard of your favorite locations, please{' '}
              <Link href="/auth">create an account.</Link>
            </span>
          </AlertDismissible>
        )}
        {jsx}
      </main>
    </div>
  )
}

export default HomePage
