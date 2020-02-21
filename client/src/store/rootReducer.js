import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import productsReducer from './products/productReducer'
import cartReducer from './cart/cartReducer'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  userReducer,
  productsReducer,
  cartReducer,
  router : connectRouter(history)
})
