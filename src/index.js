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
import pratosReducer from './store/reducers/pratosRestaurante'

//Firebase related
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from './store/firebase';


const rootReducer = combineReducers({
  auth: authReducer,
  pratos: pratosReducer
});
const createStoreWithFirebase = compose(reactReduxFirebase(firebase))(
  createStore
);

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
