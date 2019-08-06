import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCartThunk} from '../store/cart'

class ProductRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleClick(event) {
    console.log(this.props.product)
    this.props.addToCart(this.props.product, this.state.quantity)
    this.setState({quantity: 1})
  }

  async handleSelect(event) {
    event.preventDefault()
    await this.setState({quantity: event.target.value})
    console.log(this.state)
  }

  render() {
    let {product} = this.props
    return (
      <div id="product-row" className="level2">
        <Link to={'products/' + product.id}>
          <img src={product.imageUrl} className="product-image" />
          <p>{product.name}</p>
          <p>{product.brand}</p>
          <p>{product.price / 100}</p>
        </Link>
        <div key={product.id}>
          <div>
            <select onChange={this.handleSelect}>
              <option>1</option>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <button type="submit" onClick={this.handleClick}>
              Add To Cart
            </button>
          </div>
          <hr />
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  addToCart: (product, quantity) => dispatch(addToCartThunk(product, quantity))
})

export default connect(null, mapDispatch)(ProductRow)
