import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index';
export const Pedidos = (props) => {
  useEffect(() => {
    props.onGetPedidos();
    props.onShowToolBar();
  }, []);
  let pedidosEl = null;
  if(props.pedidos){
    pedidosEl = props.pedidos.map(pedido => {
      const key = Object.keys(pedido)[0];
      const key_item = Object.keys(pedido[key])[0];
      const pedido_obj = pedido[key][key_item][0];
      const {status, nome_prato} = pedido_obj;
      return <li>{nome_prato}</li>
    })
  }
  return (
    <div>
      <ul>
        {pedidosEl}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  pedidos: state.pedidos.pedidos
})

const mapDispatchToProps = dispatch => {
  return {
    onGetPedidos: () => {
      dispatch(actions.getPedidosUser(actions.getPedidosUser()))
    },
    onFechRestaurantes: () => {dispatch(actions.fetchRestaurantes())},
    onShowToolBar: () => {dispatch(actions.showToolbar())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pedidos)
