import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";


const initialState = {
  pratos: [],
  totalCarrinho: 0
}

const addCarrinho = (state,action) => {
  const newState = {...state};
 
  // return state;
  return updateObject(newState, {pratos: newState.pratos.concat(action.prato)});
}

const limparCarrinho = (state,action) => {
  console.log('Limpando carrinho reducer');
  return initialState;
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_CARRINHO: return addCarrinho(state,action);
    case actionTypes.LIMPAR_CARRINHO: return limparCarrinho(state,action);
    default: return state;
  }
}

export default reducer;