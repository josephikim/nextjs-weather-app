import { useState, useRef } from 'react'
import { signIn, SignInResponse } from 'next-auth/react'
import { getErrorMessage } from 'utils/error'
import classes from 'styles/AuthForm.module.scss'
import { IUserCredentials } from 'types'

export default function AuthForm() {
  const emailInputRef = useRef<HTMLInputElement | null>(null)
  const passwordInputRef = useRef<HTMLInputElement | null>(null)

  const [isLogin, setIsLogin] = useState(true)

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
  }

  async function createUser(newUser: IUserCredentials) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(newUser),
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

  async function loginUser(user: IUserCredentials) {
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

    const enteredEmail = emailInputRef.current?.value
    const enteredPassword = passwordInputRef.current?.value

    // validation
    if (!enteredEmail || !enteredEmail.includes('@') || !enteredPassword) {
      alert('Invalid details')
      return
    }

    if (isLogin) {
      // login returning user
      await loginUser({
        email: enteredEmail,
        password: enteredPassword,
      })
    } else {
      // register first time user
      try {
        const newUser = {
          email: enteredEmail,
          password: enteredPassword,
        }

        const result = await createUser(newUser)

        // On successful registration, login user
        if (result.id && result.email === newUser.email) {
          await loginUser(newUser)
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
            title="Must contain at least 4 or more characters"
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
