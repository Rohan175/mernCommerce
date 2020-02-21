import {
  LOAD_CART_INIT_API,
  LOAD_CART_SUCCESS_API,
  LOAD_CART_FAILURE_API,
  ADD_CART_ITEM_INIT_API,
  ADD_CART_ITEM_SUCCESS_API,
  ADD_CART_ITEM_FAILURE_API,
  SUB_CART_ITEM_INIT_API,
  SUB_CART_ITEM_SUCCESS_API,
  SUB_CART_ITEM_FAILURE_API,
  ADD_CART_ITEM_UNSAFE,
  SUB_CART_ITEM_UNSAFE
} from '../constTypes'

import API from '../api'
import { push } from 'connected-react-router'

export function subUnsafe(productId,qty){
  return {
    type: SUB_CART_ITEM_UNSAFE,
    payload: {productId,qty}
  }
}


export function addUnsafe(productId,qty){
  return {
    type: ADD_CART_ITEM_UNSAFE,
    payload: {productId,qty}
  }
}

export function fetchCart () {
  return async (dispatch) => {
    dispatch({type: LOAD_CART_INIT_API})
    try {
      const data = await API.cart.getCart()
      if(data.message){
        throw Error(data.message)
      } 
      dispatch({  
        type: LOAD_CART_SUCCESS_API,
        payload: data
      })
    } catch (error) {
      if(error.message.includes('Unauthorized')){
        dispatch(push("/home"))
      }
      dispatch({
        type: LOAD_CART_FAILURE_API,
        payload: error
      })
    }
  }
}

export function addToCart(productId,qty,price,name) {
  return async (dispatch) => {
    dispatch({type: ADD_CART_ITEM_INIT_API})
    try {
      const data = await API.cart.addItem(productId,qty,price,name)
      // dispatch({  
      //   type: ADD_CART_ITEM_SUCCESS_API,
      //   payload: data
      // })
    } catch (error) {
      if(error.message.includes('Unauthorized')){
        dispatch(push("/home"))
      }
      dispatch({
        type: ADD_CART_ITEM_FAILURE_API,
        payload: error
      })
    }
  }  
}


export function subToCart(productId,qty,price,name) {
  return async (dispatch) => {
    dispatch({type: SUB_CART_ITEM_INIT_API})
    try {
      const data = await API.cart.subItem(productId,qty,price,name)
      // dispatch({  
      //   type: SUB_CART_ITEM_SUCCESS_API,
      //   payload: data
      // })
    } catch (error) {
      if(error.message.includes('Unauthorized')){
        dispatch(push("/home"))
      }

      dispatch({
        type: SUB_CART_ITEM_FAILURE_API,
        payload: error
      })
    }
  }  
}