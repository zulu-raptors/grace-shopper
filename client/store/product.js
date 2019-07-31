import axios from 'axios'

// action types

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCT = 'GET_PRODUCT'

// actions

const getProductsAction = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

const getProductAction = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}

// thunks

export const getProductsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProductsAction(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getProductThunk = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products/' + id)
      dispatch(getProductAction(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const productsReducer = (products = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return products
  }
}

export const productReducer = (product = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return product
  }
}
