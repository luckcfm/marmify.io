
import * as actionTypes from "./actionTypes";
import axios from "../../axios-marmify";

const fetchPedidosStart = () => {

}

const fetchPedidos = () => {

}

const mudarStatusPedido = (pedido) => {
    return {
        type: actionTypes.MUDAR_STATUS_PEDIDO,
        pedido: pedido
    }
}

const registrarPedidoSucces = (pedido) => {
    return {
        type: actionTypes.REGISTRAR_PEDIDO_SUCCESS,
        pedido: pedido
    }
}


const registrarPedido = (pedido) => {
    //Realizar callback do servidor aqui.
    return dispatch => {
        dispatch(registrarPedidoSucces())
    }
}