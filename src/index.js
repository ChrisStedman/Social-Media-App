import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import postReducer from './Reducers/postReducer'
import userReducer from './Reducers/userReducer'
import currentUserReducer from './Reducers/currentUserReducer'
import filterPostReducer from './Reducers/filterPostReducer'


const reducers = combineReducers({
  posts : postReducer,
  users : userReducer,
  user : currentUserReducer,
  filter : filterPostReducer
})

const store = createStore(reducers)

ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
