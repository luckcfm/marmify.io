import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "primereact/card";
import Prato from "../../../components/Marmify/Pratos/Prato/Prato";
/*
    Aqui devera conter o registro de pratos
    exibir os pratos mais pedidos
    registrar itens
    remover itens
    habilitar prato 
    desabilitar pratos

*/
const pratosMaisPedidos = [
    {
        nome: 'Lasanha',
        qtd: 20,
        descricao: 'Delicioso prato com camadas de macarrao, queijo e presunto',
        rating: 5,
        img: 'https://img.itdg.com.br/tdg/images/recipes/000/138/558/325115/325115_original.jpg?mode=crop&width=710&height=400'
    },
    {
        nome: 'Estrogonoff',
        qtd: 55,
        descricao: 'Misturado com queijo, carnes e leite em po',
        rating: 4,
        img: 'https://portal-amb-imgs.clubedaana.com.br/2018/07/estrogonofe-de-frango-2-600x400.jpg'
    }
]


const pratos = pratosMaisPedidos.map(prato => {
    return <div className="p-col-3">
    <Prato prato={prato}></Prato>
  </div>
})

export const PratosRestaurante = () => {
  return (
    <Card title="Pratos mais pedidos">
      <div className="p-grid">
        {pratos}
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PratosRestaurante);
