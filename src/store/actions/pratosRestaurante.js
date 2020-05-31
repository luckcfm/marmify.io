
import * as actionTypes from "./actionTypes";
import firebase,{db} from "../firebase";
import store from '../store';

const registrarPratoSuccess = (prato) => {
    return {
        type: actionTypes.REGISTRAR_PRATO_SUCCESS,
        payload: prato
    }
}
const fetchPratosSuccess = (pratos) => {
    return {
        type: actionTypes.FETCH_PRATOS_SUCCESS,
        payload: pratos
    }
}

export const deletaPrato = (prato) => {
    return dispatch => {
        dispatch(deletaPratoSuccess(prato))
    }
}
const deletaPratoSuccess = (prato) => {
    return {
        type: actionTypes.DELETA_PRATO_SUCCESS,
        payload: prato
    }
}

export const registrarPrato = (prato,user) => {
    return dispatch => {
        // dispatch(registrarPratoSuccess(prato));
        firebase.database().ref(`pratos/${user.uid}`)
        .push(prato)
        .then(res => {
            console.log(res);
        })

    }
}

export const fetchPratos = () => {
    return dispatch => {
        const uid = store.getState().auth.user.userId;
        db.ref(`pratos/${uid}`).on('value', snapshot => {
            if (snapshot && snapshot.exists()) {
                //Set values in state which can be extracted in jsx in render. 
                dispatch(fetchPratosSuccess(snapshot.val()))
             }
        })
    }
}