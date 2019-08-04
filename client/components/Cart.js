import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, updateCartThunk, clearCartThunk} from '../store/cart'
import EachCart from './EachCart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    console.log('second')
    this.props.getCart()
    console.log(this.props.cart)
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
        <button type="submit" name="order" onClick={this.handleClick}>
          Submit Order
        </button>
        <button type="submit" name="clear" onClick={this.handleClick}>
          Clear Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {cart: state.cart}
}

const mapDispatch = dispatch => {
  return {
    getCart: cart => dispatch(getCartThunk(cart)),
    updateCart: (id, quantity) => dispatch(updateCartThunk(id, quantity)),
    clearCart: () => dispatch(clearCartThunk())
  }
}

export default connect(mapState, mapDispatch)(Cart)
