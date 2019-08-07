import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk, clearCartThunk} from '../store/cart'

class CheckoutInfo extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.props.clearCart()
    this.props.history.push('/')
  }

  render() {
    const cart = this.props.cart
    const user = this.props.user
    let count = 1
    let total = 0
    return (
      <div id="checkout-info" className="level1">
        <p className="is-size-3">
          Congrats, {user.firstName ? user.firstName : 'friend'}. Your payment
          is accepted
        </p>
        <br />
        <p className="is-size-4"> You've bought: </p>
        <div id="cart" className="level2">
          <table className="table">
            <tbody>
              <th>Number</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              {cart &&
                cart.map(product => {
                  total += product.quantity * product.price / 100
                  return (
                    <tr key={product.id}>
                      <td>{count++}</td>
                      <td>{product.name}</td>
                      <td>{product.brand}</td>
                      <td>{product.quantity}</td>
                      <td>${product.price / 100}</td>
                      <td>${product.price / 100 * product.quantity}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          <br />

          <p className="is-size-4">Total is: ${total.toFixed(2)} </p>

        </div>
        <button
          id="done-button"
          className="button is-info"
          type="button"
          onClick={this.handleClick}
        >
          Done
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: cart => dispatch(getCartThunk(cart)),
    clearCart: () => dispatch(clearCartThunk())
  }
}

export default connect(mapState, mapDispatch)(CheckoutInfo)
