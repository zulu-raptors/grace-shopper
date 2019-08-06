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
      email: '',
      status: 'created'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleClick(event) {
    event.preventDefault()
    await axios.post('/api/cart', {info: this.state, cart: this.props.cart})
    this.props.history.push('/checkoutinfo')
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
          <button type="submit" onClick={this.handleClick}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: cart => dispatch(getCartThunk(cart))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
