import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import AuthForm from 'components/AuthForm'
import ContentWrapper from 'components/ContentWrapper'
import { SyncLoader } from 'react-spinners'

const AuthPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { status } = useSession()

  // Redirect authenticated users to return url (or Home page)
  useEffect(() => {
    if (status === 'unauthenticated') {
      setIsLoading(false)
    } else if (status === 'authenticated') {
      void router.push(`${router.query.returnUrl ?? '/'}`)
    }
  }, [status, router])

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
  }

  return <AuthForm />
}

export default AuthPage
