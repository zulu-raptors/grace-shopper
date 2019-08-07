import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signUp} from '../store/user'

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const user = {
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      email: evt.target.email.value,
      password: evt.target.password.value
    }
    this.props.signUp(user)
    this.props.history.push('/products')
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} name={name}>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
          {/* {error && error.response && <div> {error.response.data} </div>} */}
        </form>
        <a href="/auth/google">Sign Up with Google</a>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    signUp: user => dispatch(signUp(user))
  }
}

export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
