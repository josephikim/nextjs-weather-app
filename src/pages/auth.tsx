import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import AuthForm from 'components/AuthForm'

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      setIsLoading(false)
    } else if (status === 'authenticated') {
      void router.push('/dashboard')
    }
  }, [status, router])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return <AuthForm />
}
