import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductThunk} from '../store/product'

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

  handleClick(event) {
    console.log('stored')
    localStorage.setItem('item', this.props.singleProduct.name)
    localStorage.setItem('quantity', this.state.quantity)
    localStorage.setItem(
      'total',
      this.state.quantity * this.props.singleProduct.price
    )
  }

  render() {
    const singleProduct = this.props.singleProduct
    return (
      <div>
        <img src={singleProduct.imageUrl} className="product-image" />
        <p>{singleProduct.name}</p>
        <p>{singleProduct.brand}</p>
        <p>{`$${singleProduct.price}`}</p>
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
  getSingleProduct: id => dispatch(getProductThunk(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
