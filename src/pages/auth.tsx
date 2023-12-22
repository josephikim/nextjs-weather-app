import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import AuthForm from 'components/AuthForm'
import ContentWrapper from 'components/ContentWrapper'
import { SyncLoader } from 'react-spinners'

const AuthPage: NextPage = () => {
  const router = useRouter()
  const { status } = useSession()

  const isLoading = status === 'loading'
  const isSuccess = status === 'authenticated'

  // Redirect authenticated users to home page
  if (isLoading) {
    return (
      <ContentWrapper>
        <SyncLoader
          loading={isLoading}
          aria-label="Loading Spinner"
          color="#36d7b7"
        ></SyncLoader>
      </ContentWrapper>
    )
  } else if (isSuccess) {
    void router.push('/')
  }
  return <AuthForm />
}

export default AuthPage
