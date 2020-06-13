import React, { useState, useEffect } from 'react'
import { Card } from "primereact/card";
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
// import * as actions from '../../../../../store/actions/index'
import Modal from '../../../components/UI/Modal/Modal';


export default function Aceite(props) {
  const aceitarPedido = () => {
    
  }
  return (
   <Modal show={props.showModal} pedido={props.pedido} modalClosed={props.modalClosed}>
     <h1>Aceitar Pedido? </h1>
     {/* <h3>Resumo</h3> */}
      {props.pedido ? <>
      {props.pedido.nome_prato}
      <hr></hr>
  <span>Total: R$ {parseFloat(parseFloat(props.pedido.preco_base) + props.pedido.preco_items).toFixed(2)}</span>
  <br></br>

  <Button label="Negar Pedido"></Button>
  <Button label="Aceitar Pedido"></Button>

  
  
  </> 
  
  : null }

   </Modal>
  )
}
