import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";
const initialState = {
  notifications:[{}]
};


const setNotification = (state,action) => {
  return updateObject(state, {notifications: action.notifications})
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.SET_NOTIFICATION: return setNotification(state,action);
    default: return state;
  }
}

export default reducer;