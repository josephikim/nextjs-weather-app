import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { trpc } from 'utils/trpc'

const HomePage: NextPage = () => {
  const { data: session } = useSession()
  const utils = trpc.useContext()
  const router = useRouter()
  const isAuthed = !!session?.user.id

  // Enable query if user is guest
  const { data: { data: defaultLocation } = {} } =
    trpc.getDefaultLocation.useQuery(undefined, { enabled: !isAuthed })

  // Enable query if user is authed
  const { data: { data: userLocations } = {} } =
    trpc.user.getLocations.useQuery(undefined, { enabled: isAuthed })

  useEffect(() => {
    utils.user.getLocations.invalidate()
  }, [])

  const userDefaultLocation = userLocations?.filter(
    (location) => location.isUserDefault === true
  )[0].location

  // Redirect to default forecast page
  if (isAuthed) {
    if (userDefaultLocation) {
      const url = `/forecast?location=${encodeURIComponent(
        userDefaultLocation.label
      )}&latitude=${userDefaultLocation.latitude}&longitude=${
        userDefaultLocation.longitude
      }`

      void router.push(url)
    }
  } else {
    if (defaultLocation) {
      const url = `/forecast?location=${encodeURIComponent(
        defaultLocation.label
      )}&latitude=${defaultLocation.latitude}&longitude=${
        defaultLocation.longitude
      }`

      void router.push(url)
    }
  }

  return null
}

export default HomePage
