import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, message } from 'antd'
import api from '../../api/api'
import AuthContext from '../../context/auth.context'
import { useContext } from 'react'

interface NavProp {
  isAuthenticated: boolean
}

const Navigation: React.FunctionComponent<NavProp> = (props): JSX.Element => {
  const location = useLocation()
  const { isAuthenticated } = props
  const auth = useContext(AuthContext)

  const logoutUser = () => {
    api.logoutUser().then(() => {
      auth.setAuthentication(false)
      message.success('Logout Successful')
    })
  }
  const AuthenticatedMenu: React.FunctionComponent = (): JSX.Element => {
    return (
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} defaultSelectedKeys={['/wines']}>
        <Menu.Item key="/wines">
          <Link to="/wines">Wines</Link>
        </Menu.Item>
        <Menu.Item key="/addWine">
          <Link to="/addWine">Add Wine</Link>
        </Menu.Item>
        <Menu.Item key="/vendors">
          <Link to="/vendors">Vendors</Link>
        </Menu.Item>
        <Menu.Item key="/addVendor">
          <Link to="/addVendor">Add Vendor</Link>
        </Menu.Item>
        <Menu.Item onClick={logoutUser} key="/logout">
          <Link to="/">Logout</Link>
        </Menu.Item>
      </Menu>
    )
  }

  const UnAuthenticatedMenu: React.FunctionComponent = (): JSX.Element => {
    return (
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} defaultSelectedKeys={['/wines']}>
        <Menu.Item key="/signup">
          <Link to="/signup">Sign Up</Link>
        </Menu.Item>
        <Menu.Item key="/login">
          <Link to="/login">Log In</Link>
        </Menu.Item>
      </Menu>
    )
  }
  return isAuthenticated ? <AuthenticatedMenu /> : <UnAuthenticatedMenu />
}

export default Navigation
