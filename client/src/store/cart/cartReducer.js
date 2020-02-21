import createAPIReducder from '../api/apiCreateReducer';
import {ADD_CART_ITEM_UNSAFE,SUB_CART_ITEM_UNSAFE} from '../constTypes'
import initialStateApi from '../api/apiInitState'
const initialState = {
  ...initialStateApi
}

export default createAPIReducder(["LOAD_CART","ADD_CART_ITEM","SUB_CART_ITEM"],initialState,(state,action)=>{
  let index,data;
  switch (action.type) {
    case ADD_CART_ITEM_UNSAFE:
         index = state.data.data.findIndex(item => item._id == action.payload.productId)
         data = [...state.data.data]
         console.log("hiup",data,action.payload.productId)
        if(index !== -1)
          data[index].qty += action.payload.qty
          console.log("hi",data)
        return {...state,data : {data}}
    case SUB_CART_ITEM_UNSAFE:
         index = state.data.data.findIndex(item => item._id == action.payload.productId)
         data=[...state.data.data]
        if(index !== -1)
          data[index].qty -= action.payload.qty
        return {...state,data: {data}}
    default:
        return state
    }
})
