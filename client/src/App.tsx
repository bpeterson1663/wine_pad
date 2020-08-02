import * as React from 'react'
import { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'
import { Layout } from 'antd'
import './App.css'
import AuthContext from './context/auth.context'
import api from './api/api'

import AuthenticatedApp from './AuthenticatedApp'
import UnAthenticatedApp from './UnAuthenticatedApp'
import 'antd/dist/antd.css'

const App: React.FunctionComponent = (): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState('')
  useEffect(() => {
    api.getUser().then((res) => {
      if (res.data && res.data._id) {
        setAuthentication(true, res.data._id)
      }
    })
  }, [])

  const setAuthentication = (value: boolean, id: string) => {
    setUserId(id)
    setIsAuthenticated(value)
  }

  return (
    <Layout>
      <AuthContext.Provider value={{ setAuthentication, userId }}>
        {isAuthenticated ? <AuthenticatedApp /> : <UnAthenticatedApp />}
      </AuthContext.Provider>
    </Layout>
  )
}

export default hot(module)(App)
