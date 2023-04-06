import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import AuthForm from 'components/AuthForm'

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
    return <p>Loading...</p>
  }

  return <AuthForm />
}

export default AuthPage
