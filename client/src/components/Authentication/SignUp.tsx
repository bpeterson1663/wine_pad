import * as React from 'react'
import { useContext } from 'react'
import api from '../../api/api'
import AuthContext from '../../context/auth.context'
import { useForm } from 'react-hook-form'

type User = {
  email: string
  password: string
}
type TParams = { history: [string] }
const SignUp: React.FunctionComponent<TParams> = (props): JSX.Element => {
  const { history } = props

  const { handleSubmit, register, errors } = useForm()
  const auth = useContext(AuthContext)

  const createUser = (data: User): void => {
    api
      .createUser(data)
      .then((res) => {
        auth.setAuthentication(true)
        history.push('/')
      })
      .catch((err) => console.error(err))
  }
  return (
    <main>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(createUser)}>
        <fieldset>
          <legend>Sign Up</legend>
          <label htmlFor="email">Email: </label>
          <input id="email" name="email" type="email" ref={register({ required: true })} />
          {errors.email && 'Email is required'}
          <label htmlFor="password">Password: </label>
          <input id="password" name="password" type="password" ref={register({ required: true })} />
          {errors.password && 'password is required'}
          <button type="submit">Sign Up</button>
        </fieldset>
      </form>
    </main>
  )
}

export default SignUp
