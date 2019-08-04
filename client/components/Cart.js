import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, updateCartThunk} from '../store/cart'

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
    this.props.updateCart(event.target.id, event.target.value)
  }

  render() {
    console.log('first')
    return (
      <div>
        <ul>
          {this.props.cart &&
            this.props.cart.map(order => (
              <div key={order.id}>
                <p>
                  {order.name} ${order.price / 100}
                </p>
                <img src={order.imageUrl} className="product-image" />
                <p>quantity: {order.quantity}</p>
                <p>total: ${order.quantity * order.price / 100}</p>
                <div>
                  <form>
                    <label htmlFor="quantity">quantity:</label>
                    <input
                      type="number"
                      placeholder={order.quantity}
                      value={this.state.quantity}
                      onChange={this.handleChange}
                    />
                  </form>
                  <button
                    type="submit"
                    id={order.id}
                    onClick={this.handleClick}
                  >
                    update
                  </button>
                </div>
                <hr />
              </div>
            ))}
        </ul>
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
    updateCart: (id, quantity) => dispatch(updateCartThunk(id, quantity))
  }
}

export default connect(mapState, mapDispatch)(Cart)
