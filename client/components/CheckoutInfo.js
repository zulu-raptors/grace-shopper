import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'

class CheckoutInfo extends React.Component {
  render() {
    const cart = this.props.cart
    const user = this.props.user
    let count = 1
    let total = 0
    return (
      <div id="checkout-info" className="level1">
        <p>
          Congrats, {user.firstName ? user.firstName : 'guest'}. Your payment is
          accepted
        </p>
        <br />
        <p> You've bought: </p>
        <div id="cart" className="level2">
          <table>
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
                      <td>{product.price / 100}</td>
                      <td>{product.price / 100 * product.quantity}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          <br />
          <p>Total is: ${total} </p>
        </div>
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
    getCart: cart => dispatch(getCartThunk(cart))
  }
}

export default connect(mapState, mapDispatch)(CheckoutInfo)
