import * as React from 'react'
import { hot } from 'react-hot-loader'
import './App.css'
import NewWine from './components/NewWine'

const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className="App">
      <h1>Wine Pad</h1>
      <NewWine />
    </div>
  )
}

export default hot(module)(App)
