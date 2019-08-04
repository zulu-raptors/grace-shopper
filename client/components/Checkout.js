import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, updateCartThunk, clearCartThunk} from '../store/cart'
import EachCart from './EachCart'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardHolder: '',
      cardNumber: '',
      expired: '',
      cvv: '',
      address: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  async handleClick(event) {
    event.preventDefault()
    console.log(this.state)
    await axios.post('/api/order', this.state)
  }

  render() {
    return (
      <div>
        <h1>Checkout Page</h1>
        <form>
          <label htmlFor="cardHolder">Card Holder:</label>
          <input
            name="cardHolder"
            type="text"
            onChange={this.handleChange}
            value={this.state.cardHolder}
          />
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="text"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <label htmlFor="address">Address:</label>
          <input
            name="address"
            type="text"
            onChange={this.handleChange}
            value={this.state.address}
          />
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            name="cardNumber"
            type="text"
            onChange={this.handleChange}
            value={this.state.cardNumber}
          />
          <label htmlFor="expired">Expiration Date:</label>
          <input
            name="expired"
            type="text"
            onChange={this.handleChange}
            value={this.state.expired}
          />
          <label htmlFor="cvv">cvv:</label>
          <input
            name="cvv"
            type="text"
            onChange={this.handleChange}
            value={this.state.cvv}
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
