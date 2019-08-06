import axios from 'axios'
import history from '../history'

// Action types

const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

const addToCart = (product, quantity) => {
  return {
    type: ADD_TO_CART,
    product,
    quantity
  }
}

const updateCart = (id, quantity) => {
  return {
    type: UPDATE_CART,
    id,
    quantity
  }
}

const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

export const getCartThunk = () => {
  return dispatch => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    dispatch(getCart(cart))
  }
}

export const addToCartThunk = (product, quantity) => {
  return dispatch => {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([{...product, quantity}]))
    } else {
      let orderIndex = JSON.parse(localStorage.getItem('cart')).findIndex(
        order => Number(order.id) === Number(product.id)
      )
      let newCart = JSON.parse(localStorage.getItem('cart'))
      console.log('orderIndex', orderIndex, 'id', product.id)
      if (orderIndex === -1) {
        newCart.push({...product, quantity})
        localStorage.setItem('cart', JSON.stringify(newCart))
      } else {
        newCart[orderIndex].quantity =
          Number(newCart[orderIndex].quantity) + Number(quantity)
        localStorage.setItem('cart', JSON.stringify(newCart))
      }
      dispatch(addToCart(product, quantity))
    }
  }
}

export const updateCartThunk = (id, quantity) => {
  return dispatch => {
    let orderIndex = JSON.parse(localStorage.getItem('cart')).findIndex(
      order => Number(order.id) === Number(id)
    )
    let newCart = JSON.parse(localStorage.getItem('cart'))
    console.log(id, orderIndex, newCart[orderIndex].id)
    if (Number(quantity) !== 0) {
      newCart[orderIndex].quantity = quantity
      localStorage.setItem('cart', JSON.stringify(newCart))
    } else {
      newCart.splice(orderIndex, 1)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
    dispatch(updateCart(id, quantity))
  }
}

export const clearCartThunk = () => {
  return dispatch => {
    localStorage.removeItem('cart')
    dispatch(clearCart())
  }
}

export const cartReducer = (state = [], action) => {
  let orderIndex
  let newState
  switch (action.type) {
    case GET_CART:
      return action.cart
    ///ADD_TO_CART bugs: need cart state to be consistent
    case ADD_TO_CART:
      orderIndex = state.findIndex(order => order.id === action.product.id)
      console.log(action.product.id, orderIndex)
      if (orderIndex === -1) {
        return [
          ...state,
          {
            ...action.product,
            quantity: action.quantity
          }
        ]
      } else {
        newState = [...state]
        newState[orderIndex].quantity =
          Number(newState[orderIndex].quantity) + action.quantity
        return newState
      }
    case UPDATE_CART:
      orderIndex = state.findIndex(order => order.id == action.id)
      newState = [...state]
      if (Number(action.quantity) !== 0) {
        newState[orderIndex].quantity = action.quantity
        return newState
      } else {
        newState.splice(orderIndex, 1)
        return newState
      }
    case CLEAR_CART:
      return []
    default:
      return state
  }
}
