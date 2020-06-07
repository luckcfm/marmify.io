import React from 'react'
import { connect } from 'react-redux'
import Modal from '../../UI/Modal/Modal';
import { Card } from 'primereact/card';
export const ResumoCompra = (props) => {
  console.log(props);
  const pratos = props.carrinho.pratos;
  let fechamentoElement = null;
  if(pratos.length === 0) {
    fechamentoElement = <p>Por favor, selecione um pedido para prosseguir</p>
  }else{
    pratos.map(prato => {
      console.log(prato);
    })
  }
  return (
    <div>
      <Modal show={props.showModal} modalClosed={props.hideModal}>
        <Card title="Fechar o pedido">
          {fechamentoElement}
        </Card>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  carrinho: state.carrinho
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumoCompra)
