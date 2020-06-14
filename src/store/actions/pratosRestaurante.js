import * as actionTypes from "./actionTypes";
import firebase, { db, storage } from "../firebase";
import store from "../store";

const registrarPratoSuccess = (prato) => {
  return {
    type: actionTypes.REGISTRAR_PRATO_SUCCESS,
    payload: prato,
  };
};
const fetchPratosSuccess = (pratos) => {
  return {
    type: actionTypes.FETCH_PRATOS_SUCCESS,
    payload: pratos,
  };
};

export const deletaPrato = (prato) => {
  return (dispatch) => {
    dispatch(deletaPratoSuccess(prato));
  };
};
const deletaPratoSuccess = (prato) => {
  return {
    type: actionTypes.DELETA_PRATO_SUCCESS,
    payload: prato,
  };
};
export const removerPrato = (id,user) => {
  console.log('Removendo ', user, id);
  return dispatch => {
    firebase
      .database()
      .ref(`pratos/${user.uid}`).child(id).remove()
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
  }
}
export const updatePrato = (prato, user) => {
  
}
export const registrarPrato = (prato, user) => {
  return (dispatch) => {
    // dispatch(registrarPratoSuccess(prato));
    const {image} = prato;
    delete prato.image;
   
    firebase
      .database()
      .ref(`pratos/${user.uid}`)
      .push(prato)
      .then((res) => {
        if(image !== null) {
          const pratoId = res.key;
          const uploadTask = storage.ref(`/images/${res.key}`).put(image);
          uploadTask.on('state_changed', snapshot => {
            console.log(snapshot)
          }, err => {
            console.log(err)
          }, () => {
            storage.ref('images').child(res.key).getDownloadURL()
            .then(firebaseUrl => {
              db.ref(`pratos/${user.uid}/${pratoId}`).update({image: firebaseUrl})
              .then(res => {
                console.log(res);
              })
            })
          })
        }
      });
  };
};


export const fetchPratosRestaurante = (rid) => {
  return dispatch => {
    db.ref(`pratos/${rid}`).on("value", (snapshot) => {
      if (snapshot && snapshot.exists()) {
        //Set values in state which can be extracted in jsx in render.
        dispatch(fetchPratosSuccess(snapshot.val()));
      }
    });
  }
}


export const fetchPratos = () => {
  return (dispatch) => {
    const uid = store.getState().auth.user.userId;
    db.ref(`pratos/${uid}`).on("value", (snapshot) => {
      if (snapshot && snapshot.exists()) {
        //Set values in state which can be extracted in jsx in render.
        dispatch(fetchPratosSuccess(snapshot.val()));
      }
    });
  };
};

export const toggleDisponivel = (id, value) => {
  console.log(id,value);
  return dispatch => {
    const uid = store.getState().auth.user.userId;
    db.ref(`pratos/${uid}/${id}`).update({disponivel: value})
    .then(res => {
      console.log(res);
    })
    .catch(e => {
      console.log(e);
    })
  }
};
