import axios from 'axios'
import history from '../history'

// Action types

const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

// let currentCart
// if (localStorage.getItem('cart')){
//    currentCart = JSON.parse(localStorage.getItem('cart'))
// } else {
//    currentCart = []
// }
//not sure if JSON.parse is needed, we can try without it if this doesn't work

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

const removeFromCart = (product, quantity) => {
  return {
    type: REMOVE_FROM_CART,
    product,
    quantity
  }
}

const deleteFromCart = product => {
  return {
    type: DELETE_FROM_CART,
    product
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
  let products
  let searchId
  let orderIndex
  let newState
  let remained
  switch (action.type) {
    case GET_CART:
      return action.cart
    ///ADD_TO_CART bugs: need cart state to be consistent
    case ADD_TO_CART:
      orderIndex = state.findIndex(order => order.id == action.product.id)
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

    // case ADD_TO_CART:
    //   searchId = state.findIndex(product => product.id === action.product.id)
    //   if(searchId > -1){
    //      products = state;
    //     products.searchid.quantity += 1
    //   } else {
    //     products = state.concat([{
    //       id: action.product.id,
    //       product: action.product,
    //       quantity: 1
    //     }])
    //   }
    //   localStorage.setItem('cart', JSON.stringify(products))
    //   history.push('/cart')
    //   return products

    // case DELETE_FROM_CART:
    //   searchId = state.findIndex(product => product.id === action.product.id)
    //   if (searchId > -1) {
    //     products = state
    //     products.splice(searchId, 1)
    //   }
    //   localStorage.setItem('cart', JSON.stringify(products))
    //   history.push('/cart')
    //   return products

    default:
      return state
  }
}

// const ADD_PRODUCT = 'ADD_PRODUCT'
// const DEL_PRODUCT = 'DEL_PRODUCT'
// const GET_PRODUCTS = 'GET_PRODUCTS'
// const ADD_ORDER = 'ADD_ORDER'
// const DEL_ORDER = 'DEL_ORDER'
// const GET_ORDER = 'GET_ORDER'

// // Actions

// const addOrderAction = order => {
//   return {
//     type: ADD_ORDER,
//     order
//   }
// }

// const delOrderAction = orderId => {
//   return {
//     type: DEL_ORDER,
//     orderId
//   }
// }

// const getOrderAction = order => {
//   return {
//     type: GET_ORDER,
//     order
//   }
// }

// const addProductAction = product => {
//   return {
//     type: ADD_PRODUCT,
//     product
//   }
// }

// const delProductAction = productId => {
//   return {
//     type: DEL_PRODUCT,
//     productId
//   }
// }

// const getProductsAction = products => {
//   return {
//     type: GET_PRODUCTS,
//     products
//   }
// }
