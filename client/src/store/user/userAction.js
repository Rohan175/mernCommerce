import {
    POST_LOGIN_INIT_API,
    POST_LOGIN_SUCCESS_API,
    POST_LOGIN_FAILURE_API,
    POST_SIGNUP_INIT_API,
    POST_SIGNUP_SUCCESS_API,
    POST_SIGNUP_FAILURE_API,
  } from '../constTypes'
  import API from '../api'
  import { push } from 'connected-react-router'
  
  export function login (username,password) {
    return async (dispatch) => {    
      dispatch({type: POST_LOGIN_INIT_API})
      try {
        
        const data = await API.user.login(username,password)
        if(data.message){
          throw Error(data.message)
        }    
        localStorage.setItem("auth",data.token)
        dispatch({  
          type: POST_LOGIN_SUCCESS_API,
          payload: data
        })
        dispatch(push("/home"))
        
      } catch (error) {
        console.log("erroinging login",error)
        dispatch({
          type: POST_LOGIN_FAILURE_API,
          payload: error
        })
      }
    }
  }

  
  export function signup (username,mobno,password) {
    return async (dispatch) => {
      dispatch({type: POST_SIGNUP_INIT_API})
      try {
        const data = await API.user.signup(username,mobno,password)
        if(data.message){
          throw Error(data.message)
        }
        dispatch({  
          type: POST_SIGNUP_SUCCESS_API,
          payload: data
        })
        dispatch(push("/login"))
      } catch (error) {
        dispatch({
          type: POST_SIGNUP_FAILURE_API,
          payload: error
        })
      }
    }
  }