//Usage
// import createAPIReducder from '../api/apiCreateReducer';
// import initialStateApi from '../api/apiInitState'
// const initialState = {
//   ...initialStateApi
// }
// export default createAPIReducder("ACTION_TYPE",initialState)

export default function apiReducerCreator(actionTypes,initState,extendedReducer=(state,action) => state){
    return function apiReducer (state=initState, action) {
        console.log(action.payload)
        for(let actionType of actionTypes){
            
            console.log("ApiReducer for " + actionType + " -> " + action.type)
            switch (action.type) {
                case `${actionType}_INIT_API`:
                    return {
                    ...state,
                    loading: true,
                    error: null
                    }
                case `${actionType}_FAILURE_API`:
                    
                    return {
                    ...state,
                    data: null,
                    error: action.payload.toString(),
                    loading: false
                    }
                case `${actionType}_SUCCESS_API`:
                    return {
                    ...state,
                    data: {...action.payload},//action.payload,
                    error: null,
                    loading: false
                }
            }
        }
            
        return extendedReducer(state,action)


    }
}