import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helpers/utility'

const initialState = {
  showToolbar: false,
  showSidebar: false
}

const hideToolbar = (state,action) => {
  return updateObject(state, {showToolbar: false});
}
const hideSidebar = (state,action) => {
  return updateObject(state, {hideSidebar: false})
}

const showToolbar = (state,action) => {
  return updateObject(state, {showToolbar: true});
}
const showSidebar = (state,action) => {
  return updateObject(state, {hideSidebar: true})
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HIDE_TOOLBAR: return hideToolbar(state,action);
    case actionTypes.SHOW_TOOLBAR: return showToolbar(state,action);
    case actionTypes.SHOW_SIDEBAR: return showSidebar(state,action);
    case actionTypes.HIDE_SIDEBAR: return hideSidebar(state,action);
    default: return state;
  }
}

export default reducer;