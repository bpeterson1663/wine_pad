import * as React from 'react'
import { hot } from 'react-hot-loader'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import WineList from './components/WineList/WineList'
import NewWine from './components/NewWine/NewWine'
import EditWine from './components/EditWine/EditWine'
import SignUp from './components/Authentication/SignUp'
import Login from './components/Authentication/Login'

const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />

        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/wines" exact component={WineList} />
          <Route path="/wine/:id" exact component={EditWine} />
          <Route path="/add" exact component={NewWine} />
          <Route path="/" component={WineList} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default hot(module)(App)
