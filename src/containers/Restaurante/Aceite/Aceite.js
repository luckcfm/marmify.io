import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "primereact/button";
import * as actions from "../../../store/actions/index";
// import * as actions from '../../../../../store/actions/index'
import Modal from "../../../components/UI/Modal/Modal";

const Aceite = function (props) {
  const { pedido } = props;
  let show = null;
  if (pedido) {
    const { status } = pedido;
    if (status) {
      //O pedido ja foi aceito, devemos mostrar um menu de entrega.
      const { hora } = status;
      const data = new Date(hora);
      const now = new Date();
      const elapsed = now - data;
      show = (
        <div>
          <h1>Terminar entrega do pedido? </h1>
          <h3>{props.pedido.nome_prato}</h3>
          <i>
            <b>
              Este prato esta há: {Math.round(Math.round(elapsed / 1000) / 60)}{" "}
              minutos esperando.
            </b>
          </i>

          <span style={{ float: "right" }}>
            <Button className="p-button-danger" onClick={props.modalClosed} label="Cancelar"></Button>
            <Button
              label="Pedido entregue"
              onClick={() => {
                props.onFinalizarEntrega(props.pedido);
              }}
            ></Button>
          </span>
        </div>
      );
    }else{
      show = <div>
         <h3>
         <h1>Aceitar Pedido? </h1>
           {props.pedido.nome_prato}</h3>
          <ul>
            {props.pedido.itens_escolhidos &&
              props.pedido.itens_escolhidos.map((item) => {
                return <li key={item.nome_item}> {item.nome_item} </li>;
              })}
          </ul>
          <hr></hr>
          <span style={{ float: "right" }}>
            Total:{" "}
            <b>
              R${" "}
              {parseFloat(
                parseFloat(props.pedido.preco_base) + props.pedido.preco_items
              ).toFixed(2)}
            </b>
          </span>
          <br></br>
          <hr></hr>
          <span style={{ float: "right" }}>
            <Button className="p-button-danger" label="Negar Pedido"></Button>
            <Button
              label="Aceitar Pedido"
              onClick={() => {
                props.onAceitaPedido(props.pedido);
              }}
            ></Button>
          </span>
      </div>
    }
  }

  return (
    <Modal
      show={props.showModal}
      pedido={props.pedido}
      modalClosed={props.modalClosed}
    >
      {show}
    
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAceitaPedido: (pedido) => {
      dispatch(actions.aceitaPedido(pedido));
    },
    onFinalizarEntrega: (pedido) => {
      dispatch(actions.finalizarEntrega(pedido));
    }
  };
};

export default connect(null, mapDispatchToProps)(Aceite);

