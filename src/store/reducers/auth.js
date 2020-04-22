import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helpers/utility'
const initialState = {
  token: null,
  userId: null,
  error: null,
  authRedirectPath: '/home',
  loading: false
}

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    user: action.user,
    error: null,
    authRedirectPath: '/home',
    loading: false
  })
}
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
    default: return state;
  }
}

export default reducer;