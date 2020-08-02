import * as React from 'react'
import { Layout } from 'antd'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Login from './components/Authentication/Login'
import SignUp from './components/Authentication/SignUp'
import Navigation from './components/Navigation/Navigation'
const UnAthenticatedApp: React.FunctionComponent = (): JSX.Element => {
  const { Content, Header } = Layout
  return (
    <BrowserRouter>
      <Header>
        <Navigation isAuthenticated={false} />
      </Header>
      <Content>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/" component={Login} />
        </Switch>
      </Content>
    </BrowserRouter>
  )
}

export default UnAthenticatedApp
