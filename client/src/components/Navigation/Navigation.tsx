import * as React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'

const Navigation: React.FunctionComponent = (): JSX.Element => {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Link to="/wines">Wines</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/add">Add Wine</Link>
      </Menu.Item>
    </Menu>
  )
}

export default Navigation
