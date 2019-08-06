import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, updateCartThunk, clearCartThunk} from '../store/cart'
import EachCart from './EachCart'
import {Link} from 'react-router-dom'
import Checkout from './Checkout'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  handleClick(event) {
    if (event.target.name === 'clear') {
      this.props.clearCart()
    } else {
      this.props.history.push('/checkout')
    }
  }

  render() {
    console.log('first')
    return (
      <div>
        <ul>
          {this.props.cart &&
            this.props.cart.map(order => (
              <EachCart
                key={order.id}
                order={order}
                updateCart={this.props.updateCart}
              />
            ))}
        </ul>

        <button type="submit" name="checkout" onClick={this.handleClick}>
          Checkout
        </button>
        <button type="submit" name="clear" onClick={this.handleClick}>
          Clear Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: cart => dispatch(getCartThunk(cart)),
    updateCart: (id, quantity) => dispatch(updateCartThunk(id, quantity)),
    clearCart: () => dispatch(clearCartThunk())
  }
}

export default connect(mapState, mapDispatch)(Cart)
