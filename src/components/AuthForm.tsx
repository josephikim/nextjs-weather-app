import { z } from 'zod'
import { useState, useRef } from 'react'
import { signIn, SignInResponse } from 'next-auth/react'
import { getErrorMessage } from 'utils/error'
import classes from 'styles/sass/AuthForm.module.scss'

const userCredentialsSchema = z.object({
  email: z.string().email('Email is required'),
  password: z.string().min(4, 'Password must contain 4 or more characters'),
})

type CreateUserInput = z.infer<typeof userCredentialsSchema>
type LoginUserInput = z.infer<typeof userCredentialsSchema>

const AuthForm = () => {
  const emailInputRef = useRef<HTMLInputElement | null>(null)
  const passwordInputRef = useRef<HTMLInputElement | null>(null)

  const [isLogin, setIsLogin] = useState(true)

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
  }

  async function createUser(user: CreateUserInput) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong!')
    }

    return result
  }

  async function loginUser(user: LoginUserInput) {
    const result = (await signIn('credentials', {
      redirect: false,
      email: user.email,
      password: user.password,
    })) as SignInResponse

    if (result.ok === false) {
      // alert user on failed login
      alert(`${result.error}`)
    }
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const enteredEmail = emailInputRef.current?.value as string
    const enteredPassword = passwordInputRef.current?.value as string

    if (isLogin) {
      // login returning user
      await loginUser({
        email: enteredEmail,
        password: enteredPassword,
      })
    } else {
      // register first time user
      try {
        const user: CreateUserInput = {
          email: enteredEmail,
          password: enteredPassword,
        }

        const result = await createUser(user)

        // On successful registration, login user
        if (result.email === user.email) {
          await loginUser(user)
        }
      } catch (e) {
        const message = getErrorMessage(e)
        console.log({ message })
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            pattern="^.{4,}$"
            title="Password must contain 4 or more characters"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
