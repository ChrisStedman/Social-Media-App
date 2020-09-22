import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import postReducer from './Reducers/postReducer'
import userReducer from './Reducers/userReducer'
import currentUserReducer from './Reducers/currentUserReducer'
import filterPostReducer from './Reducers/filterPostReducer'

const reducers = combineReducers({
    posts: postReducer,
    users: userReducer,
    user: currentUserReducer,
    filter: filterPostReducer
  })
  
  const store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )

  export default store