import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";
const initialState = {
  pedidos_aceitos: [],
  pedidos_negados: [],
  pedidos_esperando_aprovacao: []
};

const registrarPedido = (state,action) => {
    
}

const mudarStatusPedido = (state,action) => {
    const pedido = action.pedido;

}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTRAR_PEDIDO_SUCCESS:
      return registrarPedido(state, action);
    case actionTypes.MUDAR_STATUS_PEDIDO:
        return mudarStatusPedido(state,action);
    default:
      return state;
  }
};

export default reducer;
