
import * as actionTypes from "./actionTypes";
import axios from "../../axios-marmify";



const deletaPrato = (prato) => {
    return {
        type: actionTypes.DELETA_PRATO_SUCCESS,
        prato: prato
    }
}
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

export const registrarPrato = (prato) => {
    return dispatch => {
        dispatch(registrarPratoSuccess(prato));
    }
}