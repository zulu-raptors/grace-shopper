import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div className="has-background-black" id="banner">
    <h1 className="title has-text-success has-text-centered">LagerUp</h1>
    <p className="has-text-black">
      Logged in as: {user.id ? user.firstName + ' ' + user.lastName : 'guest'}
    </p>
    <nav className="nav-left">
      {isLoggedIn ? (
        <div className="block">
          {/* The navbar will show these links after you log in */}
          <Link
            className="link"
            style={{color: '#23d160'}}
            activeStyle={{color: '#ffdd57'}}
            to="/"
          >
            Home
          </Link>
          <Link className="link" to="/cart">
            Cart
          </Link>
          <a className="link" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/cart">
            Cart
          </Link>
          <Link className="link" to="/login">
            Login
          </Link>
          <Link className="link" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user ? state.user : {}
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}
