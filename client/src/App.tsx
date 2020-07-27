import * as React from 'react'
import { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Layout } from 'antd'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import AuthContext from './context/auth.context'
import api from './api/api'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import SignUp from './components/Authentication/SignUp'
import Login from './components/Authentication/Login'
import WineList from './components/Wine/WineList'
import NewWine from './components/Wine/NewWine'
import EditWine from './components/Wine/EditWine'
import VendorList from './components/Vendor/VendorList'
import NewVendor from './components/Vendor/NewVendor'
import EditVendor from './components/Vendor/EditVendor'
import PrivateRoute from './components/Routing/PrivateRoute'
import 'antd/dist/antd.css'

const App: React.FunctionComponent = (): JSX.Element => {
  const { Header, Content } = Layout
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState('')
  const [userEmail, setUserEmail] = useState('')
  useEffect(() => {
    //TODO: Fix async issue causing redirect to login screen
    api.getUser().then((res) => {
      if (res.data && res.data._id && res.data.email) {
        setAuthentication(true)
        setUserId(res.data._id)
        setUserEmail(res.data.email)
      }
    })
  }, [])

  const setAuthentication = (value: boolean) => {
    setIsAuthenticated(value)
  }

  return (
    <Layout>
      <BrowserRouter>
        <AuthContext.Provider value={{ setAuthentication, userId, userEmail }}>
          <Header>
            <Navigation isAuthenticated={isAuthenticated} />
          </Header>
          <Content>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={SignUp} />
              <PrivateRoute path="/wines" component={WineList} />
              <PrivateRoute path="/wine/:id" component={EditWine} />
              <PrivateRoute path="/addWine" component={NewWine} />
              <PrivateRoute path="/vendors" component={VendorList} />
              <PrivateRoute path="/vendor/:id" component={EditVendor} />
              <PrivateRoute path="/addVendor" component={NewVendor} />
              <Route path="/" component={Login} />
            </Switch>
          </Content>
        </AuthContext.Provider>
      </BrowserRouter>
    </Layout>
  )
}

export default hot(module)(App)
