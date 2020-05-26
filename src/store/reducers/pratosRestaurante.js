import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../helpers/utility'

const initialState = {
    pratos: [],
}

const registrarPrato = (state,prato) => {
    return  updateObject(state, {pratos: state.pratos.concat(prato)});
}
const deletaPrato = (state,prato) => {
    let pratos = state.pratos;
    pratos = [...pratos];
    pratos.splice(pratos.indexOf(prato),1);
    return updateObject(state,{pratos: pratos});
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.DELETA_PRATO_SUCCESS:
        return deletaPrato(state, payload);
    case actionTypes.REGISTRAR_PRATO_SUCCESS:
        return registrarPrato(state,payload);
    default:
        return state
    }
}
