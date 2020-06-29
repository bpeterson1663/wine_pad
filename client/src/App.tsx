import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Layout } from 'antd'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignUp from './components/Authentication/SignUp'
import Login from './components/Authentication/Login'
import WineList from './components/Wine/WineList'
import NewWine from './components/Wine/NewWine'
import EditWine from './components/Wine/EditWine'
import VendorList from './components/Vendor/VendorList'
import NewVendor from './components/Vendor/NewVendor'
import EditVendor from './components/Vendor/EditVendor'
import 'antd/dist/antd.css'

const App: React.FunctionComponent = (): JSX.Element => {
  const { Header, Content } = Layout

  return (
    <Layout>
      <BrowserRouter>
        <Header>
          <Navigation />
        </Header>
        <Content>
          <Switch>
            <Route path="/wines" exact component={WineList} />
            <Route path="/wine/:id" exact component={EditWine} />
            <Route path="/addWine" exact component={NewWine} />

            <Route path="/vendors" exact component={VendorList} />
            <Route path="/vendor/:id" exact component={EditVendor} />
            <Route path="/addVendor" exact component={NewVendor} />

            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/" component={WineList} />
          </Switch>
        </Content>
      </BrowserRouter>
    </Layout>
  )
}

export default hot(module)(App)
