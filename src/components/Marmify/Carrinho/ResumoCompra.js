import React from 'react'
import { connect } from 'react-redux'
import Modal from '../../UI/Modal/Modal';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import * as actions from '../../../store/actions/index'
export const ResumoCompra = (props) => {
  
  const pratos = props.carrinho.pratos;
  const limparCarrinho = () => {
    console.log("Limpando carrinho")
    props.onLimparCarrinho();
  }
  let fechamentoElement = null;
  if(pratos.length === 0) {
    fechamentoElement = <p>Por favor, selecione um pedido para prosseguir</p>
  }else{
    fechamentoElement = pratos.map(prato => {
      
      return <><Card title={prato.nome_prato} subTitle={"R$ "+ parseFloat(prato.preco_base).toFixed(2)}>
      <b>Adicionais</b>
        <ul>
          {prato.itens_escolhidos.map(item => {
            return <li key={item.nome_item}>{item.nome_item} - {item.preco_item}</li>
          })}
        </ul>
        <hr></hr>
        <h4 style={{float: 'right'}}>Total: R$ {parseFloat(prato.preco_base)}</h4>
        <br></br>
        <br></br>
      </Card><br></br></>
    })
  }
  return (
    <div>
      <Modal show={props.showModal} modalClosed={props.hideModal}>
        <h1>Fechar pedod</h1>
          {fechamentoElement}
        <Button onClick={limparCarrinho} label="Limpar Carrinho"></Button>
        <Button style={{float: 'right'}} label="Finalizar Compra"></Button>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  carrinho: state.carrinho
})

const mapDispatchToProps = dispatch => {
  return {
    onLimparCarrinho: () => {dispatch(actions.limparCarrinho())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumoCompra)
