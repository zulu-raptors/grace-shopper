import React from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/product'
import ProductRow from './ProductRow'

class ProductList extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div id="product-list">
        <div className="tile-is-child">
          {products.map(product => {
            return (
              <div key={product.id} className="product-items">
                <ProductRow product={product} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(getProductsThunk())
  }
}

export default connect(mapState, mapDispatch)(ProductList)
