import * as actionTypes from "./actionTypes";
import firebase, {storage} from "../firebase";
import * as actions from '../actions/index';
export const signup = (userData) => async (dispatch) => {
  const {image} = userData;
  delete userData.image;
  try {
    delete userData.formIsValid;
    dispatch(signUpStart())
    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((dataBeforeEmail) => {
        delete userData.password;
        delete userData.secondPassword;
        firebase.auth().onAuthStateChanged((user) => {
          firebase.database().ref('users/' + user.uid)
          .set( {
          ...userData
          })
          .then(res => {
            user.sendEmailVerification();
            const uploadTask = storage.ref(`/images/${res.key}`).put(image);
            uploadTask.on('state_changed', snapshot => {
              console.log(snapshot)
            }, err => {
              console.log(err)
            }, () => {
              storage.ref('images').child(res.key).getDownloadURL()
              .then(firebaseUrl => {
                firebase.database().ref('users/' + user.uid).update({image: firebaseUrl})
                .then(res => {
                  dispatch(signUpSuccess());
                })
              })
            })
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
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        
        const uid = user.user.uid;
        firebase.database().ref(`users/${uid}`).on('value', snapshot => {
          const userData = snapshot.val();
          // dispatch(addUserInfo(userData,user))
          dispatch(authSuccess(user.user.refreshToken,user.user,{...userData}))
          dispatch(actions.showSidebar())
        })
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
export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authSuccess = (token, user,extra) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
    token: token,
    extra:extra
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
          setAuthRedirectPath("/login");
          dispatch(authLogout())
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
  return (dispatch) => {
    dispatch(authStart());
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        firebase.database().ref(`users/${uid}`).on('value', snapshot => {
          if(snapshot.exists()){
            const userData = snapshot.val();
            userData.userId = uid;
            dispatch(actions.showSidebar())
            dispatch(authSuccess(user.refreshToken,user,{...userData}))
          }else{
            dispatch(logout())
            dispatch(authFail({ error: "Doesnt exists" }));
          }
          
        }).catch(e => {
          console.log(e);
        })
      } else {
        dispatch(logout())
        dispatch(authFail({ error: "Not authorrized" }));
      }
    });
  };
};
