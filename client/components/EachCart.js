import React, {Component} from 'react'
import {connect} from 'react-redux'

class EachCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    // this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleClick(event) {
    this.props.updateCart(this.props.order.id, this.state.quantity)
  }

  // async handleChange(event) {
  //   await this.setState({
  //     quantity: event.target.value
  //   })
  //   console.log(this.state)
  // }

  async handleSelect(event) {
    event.preventDefault()
    await this.setState({quantity: event.target.value})
    console.log(this.state)
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
          {/* <form>
            <label htmlFor="quantity">quantity:</label>
            <input
              type="number"
              placeholder={order.quantity}
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </form> */}
          <select onChange={this.handleSelect}>
            <option>-Quantity-</option>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
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
