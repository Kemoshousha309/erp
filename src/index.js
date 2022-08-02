/**
 * @file index.js The index file of the App
 * - set the interceptors for the Axios
 * - set the store for redux
 * - render the app
 * @author kareem shousha
 */

import React from "react";
import ReactDOM from "react-dom";
import "./Styles/bootstrap.min.css";
import "./index.scss";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { languageReducer } from "./Context";
import { authReducer } from "./Context/reducers/auth";
import axios from "./axios";
import * as actionTypes from "./Context/actions/actionTypes";
import { appReducer } from "./Context/reducers/app";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  lang: languageReducer,
  auth: authReducer,
  app: appReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// set axios interceptors
axios.interceptors.request.use((req) => {
  if (store.getState().auth.authData) {
    const { token } = store.getState().auth.authData;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      throw err;
    } else if (err.request) {
      store.dispatch({ type: actionTypes.NETWORK_ERROR });
      throw err;
    } else {
      throw err;
    }
  }
);

ReactDOM.render(
  // this gives us some warning to improve our app you  can use it at the end of development
  <React.StrictMode>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
