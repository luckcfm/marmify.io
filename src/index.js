import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth'

const rootReducer = combineReducers({
  auth: authReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(
    applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
