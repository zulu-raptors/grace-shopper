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
        <h1 className="is-size-3">Checkout Page</h1>
        <div>
          <form className="field">
            <label className="label" htmlFor="cardHolder">
              Card Holder:
            </label>

            <input
              className="input"
              name="cardHolder"
              type="text"
              onChange={this.handleChange}
              value={this.state.cardHolder}
            />

            <label className="label" htmlFor="email">
              Email:
            </label>
            <input
              className="input"
              name="email"
              type="text"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <label className="label" htmlFor="address">
              Address:
            </label>
            <input
              className="input"
              name="address"
              type="text"
              onChange={this.handleChange}
              value={this.state.address}
            />
            <label className="label" htmlFor="cardNumber">
              Card Number:
            </label>
            <input
              className="input"
              name="cardNumber"
              type="text"
              onChange={this.handleChange}
              value={this.state.cardNumber}
            />
            <label className="label" htmlFor="expired">
              Expiration Date:
            </label>
            <input
              className="input"
              name="expired"
              type="text"
              onChange={this.handleChange}
              value={this.state.expired}
            />
            <label className="label" htmlFor="cvv">
              cvv:
            </label>
            <input
              className="input"
              name="cvv"
              type="text"
              onChange={this.handleChange}
              value={this.state.cvv}
            />
            <button
              id="checkout-submit"
              className="button is-info"
              type="submit"
              onClick={this.handleClick}
            >
              Submit
            </button>
          </form>
        </div>
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
