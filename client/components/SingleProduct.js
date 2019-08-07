import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductThunk} from '../store/product'
import {addToCartThunk} from '../store/cart'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
  }

  handleClick() {
    console.log(this.props.match.params.productId, this.state.quantity)
    this.props.addToCart(this.props.singleProduct, this.state.quantity)
    this.props.history.push('/cart')
  }

  async handleSelect(event) {
    event.preventDefault()
    await this.setState({quantity: event.target.value})
    console.log(this.state)
  }

  render() {
    const singleProduct = this.props.singleProduct
    return (
      <div>
        <div id="single-product">
          <img src={singleProduct.imageUrl} className="product-image" />
          <p className="is-size-3">{singleProduct.name}</p>
          <p className="is-size-4">{singleProduct.brand}</p>
          <p className="is-size-3">{`$${singleProduct.price / 100}`}</p>
          <p>{singleProduct.description}</p>
          <p>{localStorage.total}</p>
          <div className="select is-multiple is-primary">
            <select onChange={this.handleSelect}>
              <option>-Quantity-</option>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <button
              id="single-add"
              className="button is-warning"
              type="submit"
              onClick={this.handleClick}
            >
              Add item
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({singleProduct: state.product})
const mapDispatch = dispatch => ({
  getSingleProduct: id => dispatch(getProductThunk(id)),
  addToCart: (product, quantity) => dispatch(addToCartThunk(product, quantity))
})

export default connect(mapState, mapDispatch)(SingleProduct)
