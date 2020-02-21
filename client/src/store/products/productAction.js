import {
    FETCH_PRODUCTS_INIT_API,
    FETCH_PRODUCTS_SUCCESS_API,
    FETCH_PRODUCTS_FAILURE_API,
  } from '../constTypes'
  import API from '../api'
  import { push } from 'connected-react-router'
  
  export function fetchProducts () {
    return async (dispatch) => {
      dispatch({type: FETCH_PRODUCTS_INIT_API})
      try {
        const data = await API.products.getAll()
        if(data.message){
          throw Error(data.message)
        } 
        return dispatch({  
          type: FETCH_PRODUCTS_SUCCESS_API,
          payload: data
        })
      } catch (error) {

        return dispatch({
          type: FETCH_PRODUCTS_FAILURE_API,
          payload: error
        })
      }
    }
  }