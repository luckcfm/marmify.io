import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";

const initialState = {
  pratos: [],
  totalCarrinho: 0
}

const addCarrinho = (state,action) => {
  const newState = {...state};
  const newArray = [...newState.pratos];
  newArray.push(action.prato);
  // return state;
  return updateObject(newState, {pratos: newArray});
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD_CARRINHO: return addCarrinho(state,action);
    default: return state;
  }
}

export default reducer;