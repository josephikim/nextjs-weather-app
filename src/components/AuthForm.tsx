import { trpc } from 'utils/trpc'
import { z } from 'zod'
import { useState, useRef } from 'react'
import { signIn, SignInResponse } from 'next-auth/react'
import { getErrorMessage } from 'utils/error'
import { UserCredentialsInputSchema } from 'models/user'
import classes from 'styles/sass/AuthForm.module.scss'

type UserCredentialsInput = z.infer<typeof UserCredentialsInputSchema>

const AuthForm = () => {
  const emailInputRef = useRef<HTMLInputElement | null>(null)
  const passwordInputRef = useRef<HTMLInputElement | null>(null)

  const [isLogin, setIsLogin] = useState(true)

  const { mutate: signup } = trpc.auth.signup.useMutation({
    onSuccess(data: any) {
      console.log('User created successfully')
    },
    onError(error) {
      console.log('Error:', error.message)
    },
  })

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
  }

  async function loginUser(input: UserCredentialsInput) {
    const result = (await signIn('credentials', {
      redirect: false,
      email: input.email,
      password: input.password,
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
      // login user
      await loginUser({
        email: enteredEmail,
        password: enteredPassword,
      })
    } else {
      // register user
      try {
        const input: UserCredentialsInput = {
          email: enteredEmail,
          password: enteredPassword,
        }

        const result = signup(input, {
          onSuccess: (data) => {
            // On successful registration, login user
            if (data.data.email === input.email) {
              loginUser(input)
            }
          },
        })
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
