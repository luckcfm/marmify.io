import * as actionTypes from "./actionTypes";
import axios from "../../axios-marmify";
import firebase from "../firebase";

export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(actionTypes.SIGNUP_START)
    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((dataBeforeEmail) => {
        firebase.auth().onAuthStateChanged((user) => {
          firebase.database().ref('users/' + user.uid)
          .set( {
            address: userData.street,
            city: userData.country,
            zipCode: userData.zipCode,
            role: userData.role
          })
          .then(res => {
            user.sendEmailVerification();
            dispatch(actionTypes.SIGNUP_SUCCESS);
          })
          .catch(e => {
            console.log(e);
          })
          // firebase.database().child("marmify").child(user.getUid()).setValue(user)
          // .then(user => {
          //   user.sendEmailVerification();
          // })
          // .catch(e => {
          //   console.log(e);
          // })
          
        });
      })
      .then((dataAfterEmail) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user.emailVerified) {
            dispatch({
              type: actionTypes.SIGNUP_SUCCESS,
              msg:
                "Sua conta foi criada com sucesso! Agora voce precisa verificar seu email!",
            });
          } else {
            dispatch({
              type: actionTypes.SIGNUP_ERROR,
              msg:
                "Alguma coisa nao deu certo, por favor tente novamente em alguns instantes!",
            });
          }
        });
      });
  } catch (err) {
    console.log(err);
    dispatch({
      type: actionTypes.SIGNUP_ERROR,
      msg:
        "Alguma coisa deu errado e nao conseguimos criar sua conta, por favor tente novamente!",
    });
  }
};

export const signin = (email, password, callback) => {
  return dispatch => {
    dispatch(authStart())
    try {
      // dispatch(actionTypes.AUTH_START);
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("here", user);
        dispatch({ type: actionTypes.SIGNIN_SUCCESS });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.SIGNIN_ERROR,
          msg: "Credenciais de login invalidas.",
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  
};
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
    token: token,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationData");
  localStorage.removeItem("user");
  return (dispatch) => {
    dispatch(() => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('loggin out!')
          setAuthRedirectPath("/auth");
          return {
            type: actionTypes.AUTH_LOGOUT,
          };
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };
  console.log("here");
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const url = "/User/login";
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data);
        // localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(authSuccess(response.data));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  console.log("checkin state");
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(authSuccess(user.uid, user));
      } else {
        dispatch(authFail({ error: "Not authorrized" }));
      }
    });
  };
};
