import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductThunk} from '../store/product'
import {addToCartThunk} from '../store/cart'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
  }

  async handleChange(event) {
    await this.setState({
      quantity: event.target.value
    })
    console.log(this.state)
  }

  handleClick() {
    console.log(this.props.match.params.productId, this.state.quantity)
    this.props.addToCart(this.props.singleProduct, this.state.quantity)
  }

  render() {
    const singleProduct = this.props.singleProduct
    return (
      <div>
        <img src={singleProduct.imageUrl} className="product-image" />
        <p>{singleProduct.name}</p>
        <p>{singleProduct.brand}</p>
        <p>{`$${singleProduct.price / 100}`}</p>
        <p>{singleProduct.description}</p>
        <p>{localStorage.total}</p>
        <div>
          <form>
            <label htmlFor="quantity">quantity:</label>
            <input
              type="number"
              onChange={this.handleChange}
              value={this.state.quantity}
            />
          </form>
          <button type="submit" onClick={this.handleClick}>
            Add item
          </button>
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
