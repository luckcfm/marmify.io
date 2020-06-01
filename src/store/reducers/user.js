import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";
const initialState = {
  restaurantes: {},
  stars:{}
}

const fetchRestaurantesSuccess = (state,action) => {
  return updateObject(state, {restaurantes: action.restaurantes})
}

const fetchStartsSuccess = (state,action) => {
  return updateObject(state, {stars: action.stars});
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_RESTAURANTE_SUCCESS: return fetchRestaurantesSuccess(state,action)
    case actionTypes.FETCH_STARS_SUCCESS: return fetchStartsSuccess(state,action);
    default: return state;
  }
}

export default reducer;