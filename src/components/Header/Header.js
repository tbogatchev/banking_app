import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <h1 className="ui header">Banking App</h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/transactions' activeClassName={classes.activeRoute}>
      Banking App
    </Link>
  </div>
)

export default Header
