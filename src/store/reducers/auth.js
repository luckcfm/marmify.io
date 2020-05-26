import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helpers/utility'

const initialState = {
  token: null,
  userId: null,
  user: {},
  error: null,
  authRedirectPath: '/home',
  loading: true,
  loadingSignUp: false,
  loadingSignUpErr: null,
  loadingSignUpMsg: null
}



const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
  console.log(action);
  return updateObject(state, {
    token: action.token,
    user: action.user,
    error: null,
    user: {...action.extra},
    // authRedirectPath: '/home',
    loading: false
  })
}
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path })
}

const signUpStart = (state,action) => {
  return updateObject(state, {loadingSignUpErr: null, loadingSignUp: true, loadingSignUpMsg: null});
}

const signUpSuccess = (state,action) => {
  return updateObject(state, {loadingSignUpErr: null, loadingSignUp: false, loadingSignUpMsg: 'Usuario registrado, por favor cheque seu email para concluir o cadastro.'})
}

const signUpError = (state, action) => {
  return updateObject(state, {loadingSignUpErr: {err: action.msg}, loadingSignUp: false, loadingSignUpMsg: null});
}

const addUserInfo = (state,action) => {
  console.log(action);
  return updateObject(state, {user: {...action.extraInfo}})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:              return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:            return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:               return authFail(state, action);
    case actionTypes.ADD_USER_INFO:            return addUserInfo(state,action);
    case actionTypes.SIGNUP_START:            return signUpStart(state,action);
    case actionTypes.SIGNUP_SUCCESS:          return signUpSuccess(state,action);
    case actionTypes.SIGNUP_ERROR:            return signUpError(state,action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:  return setAuthRedirectPath(state,action);
    default: return state;
  }
}

export default reducer;