import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { SyncLoader } from 'react-spinners'
import { trpc } from 'utils/trpc'
import ContentWrapper from 'components/ContentWrapper'

const HomePage: NextPage = () => {
  const { status } = useSession()
  const router = useRouter()
  const isAuthed = status === 'authenticated'
  const isGuest = status === 'unauthenticated'

  // Enable query if user is guest
  const { data: defaultLocation, status: defaultLocationStatus } =
    trpc.getDefaultLocation.useQuery(undefined, {
      enabled: isGuest,
    })

  const defaultLocationIsError = defaultLocationStatus === 'error'

  // Enable query if user is authed
  const { data: userLocations, status: userLocationsStatus } =
    trpc.user.getLocations.useQuery(undefined, {
      enabled: isAuthed,
    })

  const userLocationsIsError = userLocationsStatus === 'error'

  if (isGuest && defaultLocation) {
    const url = `/forecast?location=${encodeURIComponent(
      defaultLocation.label
    )}&latitude=${defaultLocation?.latitude}&longitude=${
      defaultLocation.longitude
    }`

    router.push(url)
  }

  if (isAuthed && userLocations) {
    const userDefaultLocation = userLocations.filter(
      (location) => location.isUserDefault === true
    )[0]

    const url = `/forecast?location=${encodeURIComponent(
      userDefaultLocation.location.label
    )}&latitude=${userDefaultLocation.location.latitude}&longitude=${
      userDefaultLocation.location.longitude
    }`
    router.push(url)
  }

  if (
    (isGuest && defaultLocationIsError) ||
    (isAuthed && userLocationsIsError)
  ) {
    return <ContentWrapper>Error loading page</ContentWrapper>
  } else {
    return (
      <ContentWrapper>
        <SyncLoader
          loading={true}
          aria-label="Loading Spinner"
          color="#36d7b7"
        ></SyncLoader>
      </ContentWrapper>
    )
  }
}

export default HomePage
