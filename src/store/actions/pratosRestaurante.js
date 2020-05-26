
import * as actionTypes from "./actionTypes";
import firebase from "../firebase";


const registrarPratoSuccess = (prato) => {
    return {
        type: actionTypes.REGISTRAR_PRATO_SUCCESS,
        prato: prato
    }
}


export const deletaPrato = (prato) => {
    return dispatch => {
        dispatch(deletaPrato(prato))
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