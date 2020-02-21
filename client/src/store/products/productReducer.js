import createAPIReducder from '../api/apiCreateReducer';
import initialStateApi from '../api/apiInitState'
const initialState = {
  ...initialStateApi
}

export default createAPIReducder(["FETCH_PRODUCTS"],initialState)
