import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Layout } from 'antd'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import WineList from './components/WineList/WineList'
import NewWine from './components/NewWine/NewWine'
import EditWine from './components/EditWine/EditWine'
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
            <Route path="/add" exact component={NewWine} />
            <Route path="/" component={WineList} />
          </Switch>
        </Content>
      </BrowserRouter>
    </Layout>
  )
}

export default hot(module)(App)
