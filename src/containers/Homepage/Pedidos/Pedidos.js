import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index';
export const Pedidos = (props) => {
  useEffect(() => {
    props.onGetPedidos();
    props.onShowToolBar();
  }, []);
  let pedidosConcluidos = [];
  let pedidosEmEspera = [];
  if(props.pedidos){
    props.pedidos.map(pedido => {
      const key = Object.keys(pedido)[0];
      Object.keys(pedido[key]).map(key2 => {
        const key_item = key2;
        const pedido_obj = pedido[key][key2];
        const {status, nome_prato} = pedido_obj;
        if(status && status.aceito && !status.entregue){
          pedidosEmEspera.push(<li>{nome_prato} - {status.hora}</li>)
          }else{
            pedidosConcluidos.push(<li>{nome_prato}</li>)
          }
      })
    })
  }
  return (
    <div>
      <h1>Aguardando entrega</h1>
      <ul>
        {pedidosEmEspera}
      </ul>
      <h1>Finalizados</h1>
      <ul>
        {pedidosConcluidos}
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
