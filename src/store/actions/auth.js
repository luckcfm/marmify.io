import * as actionTypes from "./actionTypes";
import axios from "../../axios-marmify";
import firebase from '../firebase'


export const signup = (email, password) => async dispatch => {
  try{
    firebase
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then(dataBeforeEmail => {
        firebase.auth().onAuthStateChanged(user => {
          user.sendEmailVerification();
        })
      })
      .then(dataAfterEmail => {
        firebase.auth().onAuthStateChanged(user => {
          if(user.emailVerified) {
            dispatch({
              type: actionTypes.SIGNUP_SUCCESS,
              msg: 'Sua conta foi criada com sucesso! Agora voce precisa verificar seu email!'
            });
          } else {
            dispatch({
              type: actionTypes.SIGNUP_ERROR,
              msg: 'Alguma coisa nao deu certo, por favor tente novamente em alguns instantes!'
            })
          }
        })
      })
  } catch (err) {
    dispatch({
      type: actionTypes.SIGNUP_ERROR,
      msg: 'Alguma coisa deu errado e nao conseguimos criar sua conta, por favor tente novamente!'
    })
  }
}

export const signin = (email,password,callback) => async dispatch => {
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({type: actionTypes.SIGNIN_SUCCESS});
        callback();
      })
      .catch(() => {
        dispatch({
          type: actionTypes.SIGNIN_ERROR,
          msg: 'Credenciais de login invalidas.'
        })
      })
  }catch (err) {
    dispatch({type: actionTypes.SIGNIN_ERROR, msg: 'Credenciais de login invalidas.'})
  }
}
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationData");
  localStorage.removeItem("user");
  setAuthRedirectPath("/auth");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    const url = "/User/login";
    axios
      .post(url, authData)
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data);
        // localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};
export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  console.log("checkin state");
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log('loggin out..')
      dispatch(logout());
    } else {
      // const expirationTime = new Date(localStorage.getItem('expirationData'));
      if (true == false) {
        dispatch(logout());
      } else {
        if (
          localStorage.getItem("user") !== undefined &&
          localStorage.getItem("user") !== "undefined"
        ) {
          const userId = localStorage.getItem("user");
          dispatch(authSuccess(token, userId));
        } else {
          dispatch(authFail({ error: "Not authorrized" }));
        }

        // dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000 ));
      }
    }
  };
};
