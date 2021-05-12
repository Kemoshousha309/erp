import React from 'react';
import ReactDOM from 'react-dom';
import "./bootstrap/css/bootstrap.min.css";
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { languageReducer } from './store';
import thunk from "redux-thunk"
import { Provider } from 'react-redux';
import { authReducer } from './store/reducers/auth';
import axios from "./axios"



const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  lang: languageReducer,
  auth: authReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// set axios interceptors
axios.interceptors.request.use(req => {
  if(store.getState().auth.authData){
    const token = store.getState().auth.authData.token
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

ReactDOM.render(
  // <React.StrictMode> this gives us some warning to improve our app you  can use it at the end of devolopment
    <Provider store={store} >
      <App /> 
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
