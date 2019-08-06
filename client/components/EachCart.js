import React, {Component} from 'react'
import {connect} from 'react-redux'

class EachCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.props.updateCart(this.props.order.id, this.state.quantity)
  }

  async handleChange(event) {
    await this.setState({
      quantity: event.target.value
    })
  }

  render() {
    let {order} = this.props
    return (
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
          <button type="submit" onClick={this.handleClick}>
            update
          </button>
        </div>
        <hr />
      </div>
    )
  }
}

export default EachCart
