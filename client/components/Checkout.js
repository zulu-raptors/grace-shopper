import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, updateCartThunk, clearCartThunk} from '../store/cart'
import EachCart from './EachCart'
import {Link} from 'react-router-dom'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <h1>Checkout Page</h1>
        <form>
          <label htmlFor="firstName">FirstName:</label>
          <input
            name="firstName"
            type="text"
            // onChange={props.handleChange}
            // value={props.student.firstName}
          />
          <label htmlFor="lastName">LastName:</label>
          <input
            name="lastName"
            type="text"
            // onChange={props.handleChange}
            // value={props.student.lastName}
          />
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="text"
            // onChange={props.handleChange}
            // value={props.student.email}
          />
        </form>
        <button type="submit" onClick={this.props.handleClick}>
          Submit
        </button>
      </div>
    )
  }
}

export default Checkout
