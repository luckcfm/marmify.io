import React from 'react'
import { connect } from 'react-redux'
import Modal from '../../UI/Modal/Modal';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import * as actions from '../../../store/actions/index'
export const ResumoCompra = (props) => {
  let totalPedido = 0;
  let fechamentoElement = null;
  const pratos = props.carrinho.pratos;

  const limparCarrinho = () => {
    props.onLimparCarrinho();
    props.hideModal();
  }
  const finalizarPedido = () => {
    props.onFinalizarPedido();
  }
  if (pratos.length === 0) {
    fechamentoElement = <p>Por favor, realize um pedido para prosseguir</p>
  } else {
    fechamentoElement = pratos.map(prato => {
      totalPedido += parseFloat(prato.preco_base) + parseFloat(prato.preco_items)
      return <><Card title={prato.nome_prato} subTitle={"R$ " + parseFloat(prato.preco_base).toFixed(2)}>
        <b>Adicionais</b>
        <ul>
          {prato.itens_escolhidos.map(item => {
            return <li key={item.nome_item}>{item.nome_item} - {item.preco_item}</li>
          })}
        </ul>
        <hr></hr>
        <h4 style={{ float: 'right' }}>Total: R$ {parseFloat(prato.preco_base) + parseFloat(prato.preco_items)}</h4>
        <br></br>
        <br></br>
      </Card></>
    })
  }
  return (
    <div>
      <Modal show={props.showModal} modalClosed={props.hideModal}>
        <h1>Fechar Pedido</h1>
        {fechamentoElement}
        <h1></h1>
        {pratos.length > 0 ? 
        <span style={{ float: 'right' }}>
          Total Pedido:  <b>R$ {totalPedido}</b>
        </span> : null}
        <br></br>
        {pratos.length > 0 ? <span style={{ float: 'right' }} >
          <Button 
            style={{ padding: '2px', margin: '2px' }} 
            onClick={limparCarrinho} 
            label="Limpar Carrinho"></Button>
          <Button 
            style={{ padding: '2px', margin: '2px' }} 
            onClick={finalizarPedido}
            label="Finalizar Compra"></Button>
        </span> : null}
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  carrinho: state.carrinho
})

const mapDispatchToProps = dispatch => {
  return {
    onLimparCarrinho: () => { dispatch(actions.limparCarrinho())},
    onFinalizarPedido: () => {dispatch(actions.fecharCarrinho())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumoCompra)
