import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'

const Navigation: React.FunctionComponent = (): JSX.Element => {
  const location = useLocation()
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
      <Menu.Item key="/signup">
        <Link to="/signup">Sign Up</Link>
      </Menu.Item>
      <Menu.Item key="/login">
        <Link to="/login">Log In</Link>
      </Menu.Item>
    </Menu>
  )
}

export default Navigation
