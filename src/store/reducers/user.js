import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";
const initialState = {
  restaurantes: {}
}

const fetchRestaurantesSuccess = (state,action) => {
  return updateObject(state, {restaurantes: action.restaurantes})
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_RESTAURANTE_SUCCESS: return fetchRestaurantesSuccess(state,action)
    default: return state;
  }
}

export default reducer;