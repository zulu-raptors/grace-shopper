import axios from 'axios'

// Action types

const ADD_PRODUCT = 'ADD_PRODUCT'
const DEL_PRODUCT = 'DEL_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_ORDER = 'ADD_ORDER'
const DEL_ORDER = 'DEL_ORDER'
const GET_ORDER = 'GET_ORDER'

// Actions

const addOrderAction = order => {
  return {
    type: ADD_ORDER,
    order
  }
}

const delOrderAction = orderId => {
  return {
    type: DEL_ORDER,
    orderId
  }
}

const getOrderAction = order => {
  return {
    type: GET_ORDER,
    order
  }
}

const addProductAction = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

const delProductAction = productId => {
  return {
    type: DEL_PRODUCT,
    productId
  }
}

const getProductsAction = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}
