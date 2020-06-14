import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "primereact/button";
import * as actions from '../../../store/actions/index';
// import * as actions from '../../../../../store/actions/index'
import Modal from "../../../components/UI/Modal/Modal";

const Aceite = function(props) {
  return (
    <Modal
      show={props.showModal}
      pedido={props.pedido}
      modalClosed={props.modalClosed}
    >
      <h1>Aceitar Pedido? </h1>
      {props.pedido ? (
        <>
          <h3>{props.pedido.nome_prato}</h3>
          <ul>
          {props.pedido.itens_escolhidos && props.pedido.itens_escolhidos.map(item => {
            return <li key={item.nome_item}> {item.nome_item} </li>
          })}
          </ul>
          <hr></hr>
          <span style={{float: 'right'}}>
            Total: <b>R${" "}
            {parseFloat(
              parseFloat(props.pedido.preco_base) + props.pedido.preco_items
            ).toFixed(2)}</b>
          </span>
          <br></br>
          <hr></hr>
          <span style={{float: 'right'}}>
          <Button className="p-button-danger" label="Negar Pedido"></Button>
          <Button label="Aceitar Pedido"  onClick={() => {props.onAceitaPedido(props.pedido)}}></Button>
          </span>
        </>
      ) : null}
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAceitaPedido: (pedido) => {dispatch(actions.aceitaPedido(pedido))}
  }
}

export default connect(null,mapDispatchToProps)(Aceite);
