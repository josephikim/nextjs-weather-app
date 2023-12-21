import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { trpc } from 'utils/trpc'
import ContentWrapper from 'components/ContentWrapper'
import { SyncLoader } from 'react-spinners'

const HomePage: NextPage = () => {
  const { status } = useSession()
  const router = useRouter()
  const isLoading = status === 'loading'
  const isAuthed = status === 'authenticated'
  const isGuest = status === 'unauthenticated'

  // Enable query if user is guest
  const { data: { data: defaultLocation } = {} } =
    trpc.getDefaultLocation.useQuery(undefined, { enabled: isGuest })

  // Enable query if user is authed
  const { data: { data: userLocations } = {} } =
    trpc.user.getLocations.useQuery(undefined, { enabled: isAuthed })

  const userDefaultLocation = userLocations?.filter(
    (location) => location.isUserDefault === true
  )[0]

  // Redirect to forecast page
  if (userDefaultLocation) {
    const url = `/forecast?location=${encodeURIComponent(
      userDefaultLocation.location.label
    )}&latitude=${userDefaultLocation.location.latitude}&longitude=${
      userDefaultLocation.location.longitude
    }`
    router.push(url)
  } else if (defaultLocation) {
    const url = `/forecast?location=${encodeURIComponent(
      defaultLocation.label
    )}&latitude=${defaultLocation.latitude}&longitude=${
      defaultLocation.longitude
    }`
    router.push(url)
  }
  return (
    <ContentWrapper>
      <SyncLoader
        loading={isLoading}
        aria-label="Loading Spinner"
        color="#36d7b7"
      ></SyncLoader>
    </ContentWrapper>
  )
}

export default HomePage
