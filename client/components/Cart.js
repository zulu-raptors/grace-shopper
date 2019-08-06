import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, updateCartThunk, clearCartThunk} from '../store/cart'
import EachCart from './EachCart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.getSubtotal = this.getSubtotal.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  async handleChange(event) {
    await this.setState({
      quantity: event.target.value
    })
    console.log(this.state)
  }

  handleClick(event) {
    if (event.target.name === 'clear') {
      this.props.clearCart()
    } else {
      this.props.history.push('/checkout')
    }
  }

  getSubtotal(cart) {
    let subtotal = 0
    for (let i = 0; i < cart.length; i++) {
      subtotal += cart[i].price * cart[i].quantity
    }
    return subtotal
  }

  render() {
    let {cart} = this.props
    return (
      <div>
        <ul>
          {cart &&
            cart.map(order => (
              <EachCart
                key={order.id}
                order={order}
                updateCart={this.props.updateCart}
              />
            ))}
        </ul>
        <p>Subtotal: ${cart && this.getSubtotal(cart) / 100} </p>
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
