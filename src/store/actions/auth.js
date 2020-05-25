import * as actionTypes from "./actionTypes";
import firebase from "../firebase";


const addUserInfo = (data) => {
  console.log(data);
  return {
    type: actionTypes.ADD_USER_INFO
  }
}


export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(signUpStart())
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
            dispatch(signUpSuccess());
          })
          .catch(e => {
            console.log(e);
          })
        });
      })
      .then((dataAfterEmail) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user.emailVerified) {
            dispatch(signUpSuccess());
          } else {
            dispatch(signUpError());
          }
        });
      });
  } catch (err) {
    console.log(err);
    dispatch(signUpError());
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
        const uid = user.user.uid;
        firebase.database().ref(`users/${uid}`).on('value', snapshot => {
          console.log('here');
          const userData = snapshot.val();
          dispatch(addUserInfo(userData))
        })
        dispatch(authSuccess());
      })
      .catch((e) => {
        console.log(e);
        dispatch(authFail(e.message));
      });
    } catch (err) {
      console.log(err);
    }
  }
  
};

const signUpSuccess = () => {
  return {
    type: actionTypes.SIGNUP_SUCCESS
  }
}

const signUpError = (errMsg) => {
  return {
    type: actionTypes.SIGNUP_ERROR,
    msg: errMsg
  }
}

const signUpStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  }
}

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
