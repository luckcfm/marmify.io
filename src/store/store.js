import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk            from "redux-thunk";
import authReducer from './reducers/auth'
import pratosReducer from './reducers/pratosRestaurante'
import layoutReducer from './reducers/layout'
import userReducer from './reducers/user';
import carrinhoReducer from './reducers/carrinho'
const rootReducer = combineReducers({
  auth: authReducer,
  pratos: pratosReducer,
  layout: layoutReducer,
  user: userReducer,
  carrinho: carrinhoReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));


export default store;