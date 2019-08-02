// import axios from 'axios'
// import history from '../history'

// // Action types

// const GET_CART = 'GET_CART'
// const CLEAR_CART = 'CLEAR_CART'
// const ADD_TO_CART = 'ADD_TO_CART'
// const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
// const DELETE_FROM_CART = 'DELETE_FROM_CART'

// let currentCart
// if (localStorage.getItem('cart')){
//    currentCart = JSON.parse(localStorage.getItem('cart'))
// } else {
//    currentCart = []
// }
// //not sure if JSON.parse is needed, we can try without it if this doesn't work

// const getCart = () => {
//   return {
//     type: GET_CART
//   }
// }

// const addToCart = (product) => {
//   return {
//     type: ADD_TO_CART,
//     product
//   }
// }

// const removeFromCart = (product) => {
//   return {
//     type: REMOVE_FROM_CART,
//     product
//   }
// }

// const deleteFromCart = (product) => {
//   return {
//     type: DELETE_FROM_CART,
//     product
//   }
// }

// const clearCart = () => {
//   return {
//     type: CLEAR_CART
//   }
// }

// const cartReducer = (state = currentCart, action) => {
//   let products;
//   let searchId;
//   switch(action.type){
//     case ADD_TO_CART:
//       searchId = state.findIndex(product => product.id === action.product.id)
//       if(searchId > -1){
//          products = state;
//         products.searchid.quantity += 1
//       } else {
//         products = state.concat([{
//           id: action.product.id,
//           product: action.product,
//           quantity: 1
//         }])
//       }
//       localStorage.setItem('cart', JSON.stringify(products))
//       history.push('/cart')
//       return products

//       case DELETE_FROM_CART:
//         searchId = state.findIndex(product => product.id === action.product.id)
//         if(searchId > -1) {
//           products = state;
//           products.splice(searchId, 1)
//         }
//         localStorage.setItem('cart', JSON.stringify(products))
//         history.push('/cart')
//         return products

//       default:
//         return state
//   }
// }

// export default cartReducer

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
