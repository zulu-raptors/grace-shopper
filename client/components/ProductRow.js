import React from 'react'
import {Link} from 'react-router-dom'

const ProductRow = props => {
  const product = props.product
  return (
    <div id="product-row" className="level2">
      <Link to={'products/' + product.id}>
        <img src={product.imageUrl} className="product-image" />
        <p>{product.name}</p>
        <p>{product.brand}</p>
        <p>{product.price / 100}</p>
      </Link>
      <button type="button">Add to Cart</button>
    </div>
  )
}

export default ProductRow
