import * as React from 'react'
import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth.context'

const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const auth = useContext(AuthContext)
  const routeComponent = (props: any) =>
    auth.userId ? React.createElement(component, props) : <Redirect to={{ pathname: '/login' }} />
  return <Route exact {...rest} render={routeComponent} />
}

export default PrivateRoute
