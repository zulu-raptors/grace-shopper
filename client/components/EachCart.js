import React, {Component} from 'react'
import {connect} from 'react-redux'

class EachCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleClick(event) {
    this.props.updateCart(this.props.order.id, this.state.quantity)
  }

  async handleChange(event) {
    await this.setState({
      quantity: event.target.value
    })
  }

  async handleSelect(event) {
    event.preventDefault()
    await this.setState({quantity: event.target.value})
    console.log(this.state)
  }

  render() {
    let {order} = this.props
    return (
      <div key={order.id}>
        <p className="is-size-3 has-text-centered">
          {order.name} ${order.price / 100}
        </p>
        <img src={order.imageUrl} className="has-image-centered" />
        <p className="is-size-3 has-text-centered">
          Quantity: {order.quantity}
        </p>
        <p className="is-size-3 has-text-centered">
          Total: ${order.quantity * order.price / 100}
        </p>
        <div className="each-cart-select">
          <div id="cart-select" className="select is-multiple is-primary">
            <select onChange={this.handleSelect}>
              <option>-Quantity-</option>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <button
              className="button is-warning is-medium"
              type="submit"
              onClick={this.handleClick}
            >
              update
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default EachCart
