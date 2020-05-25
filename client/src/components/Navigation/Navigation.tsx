import * as React from 'react'
import { Link } from 'react-router-dom'

const Navigation: React.FunctionComponent = (): JSX.Element => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/wines">Wines</Link>
        </li>
        <li>
          <Link to="/add">Add Wine</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
