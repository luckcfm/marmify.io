import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";
const initialState = {
  pratos: [],
  totalCarrinho: 0
}


const reducer = (state = initialState, action) => {
  switch(action.type){
    default: return state;
  }
}

export default reducer;