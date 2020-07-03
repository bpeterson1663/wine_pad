import * as React from 'react'
import { useContext } from 'react'
import api from '../../api/api'
import { useForm } from 'react-hook-form'

type User = {
  email: string
  password: string
}
type TParams = { history: [string] }

const Login: React.FunctionComponent<TParams> = (props): JSX.Element => {
  const { history } = props
  const { handleSubmit, register, errors } = useForm()

  const loginUser = (data: User): void => {
    api
      .authenticateUser(data)
      .then((res) => {
        history.push('/')
      })
      .catch((err) => console.error(err))
  }
  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(loginUser)}>
        <fieldset>
          <legend>Login</legend>
          <label htmlFor="email">Email: </label>
          <input id="email" name="email" type="email" ref={register({ required: true })} />
          {errors.email && 'Email is required'}
          <label htmlFor="password">Password: </label>
          <input id="password" name="password" type="password" ref={register({ required: true })} />
          {errors.password && 'password is required'}
          <button type="submit">Login</button>
        </fieldset>
      </form>
    </main>
  )
}

export default Login
