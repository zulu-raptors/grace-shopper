import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

const AuthFormLogin = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form className="field" onSubmit={handleSubmit} name={name}>
        <div>
          <label className="label" htmlFor="email">
            <small>Email</small>
          </label>
          <input className="input" name="email" type="text" />
        </div>
        <div>
          <label className="label" htmlFor="password">
            <small>Password</small>
          </label>
          <input className="input" name="password" type="password" />
        </div>
        <div>
          <button className="button is-info" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a className="button is-info" href="/auth/google">
        {displayName} with Google
      </a>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

AuthFormLogin.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

export const Login = connect(mapLogin, mapDispatch)(AuthFormLogin)
