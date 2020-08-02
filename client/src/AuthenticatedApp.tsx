import * as React from 'react'
import { Layout } from 'antd'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import WineList from './components/Wine/WineList'
import NewWine from './components/Wine/NewWine'
import EditWine from './components/Wine/EditWine'
import OrderForm from './components/OrderForm/OrderForm'
import VendorList from './components/Vendor/VendorList'
import NewVendor from './components/Vendor/NewVendor'
import EditVendor from './components/Vendor/EditVendor'
import Navigation from './components/Navigation/Navigation'

const AuthenticatedApp: React.FunctionComponent = (): JSX.Element => {
  const { Content, Header } = Layout
  return (
    <BrowserRouter>
      <Header>
        <Navigation isAuthenticated={true} />
      </Header>
      <Content>
        <Switch>
          <Route path="/wines" component={WineList} />
          <Route path="/orderForm" component={OrderForm} />
          <Route path="/wine/:id" component={EditWine} />
          <Route path="/addWine" component={NewWine} />
          <Route path="/vendors" component={VendorList} />
          <Route path="/vendor/:id" component={EditVendor} />
          <Route path="/addVendor" component={NewVendor} />
          <Route path="/" component={WineList} />
        </Switch>
      </Content>
    </BrowserRouter>
  )
}

export default AuthenticatedApp
