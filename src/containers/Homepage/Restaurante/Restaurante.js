//Aqui estara concentrada as informacoes de pedido do usuario.
import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import Spinner from '../../../components/UI/Spinner/Spinner'
import {ScrollPanel} from 'primereact/scrollpanel';
import Prato from "../../../components/Marmify/Pratos/Prato/Prato";
import List from '../../../components/Marmify/Pratos/Prato/List/List';
export const Restaurante = (props) => {
  const pratosMaisPedidos = [
    {
      nome: "Lasanha",
      qtd: 20,
      descricao: "Delicioso prato com camadas de macarrao, queijo e presunto",
      rating: 5,
      img:
        "https://img.itdg.com.br/tdg/images/recipes/000/138/558/325115/325115_original.jpg?mode=crop&width=710&height=400",
    },
    {
      nome: "Estrogonoff",
      qtd: 55,
      descricao: "Misturado com queijo, carnes e leite em po",
      rating: 4,
      img:
        "https://portal-amb-imgs.clubedaana.com.br/2018/07/estrogonofe-de-frango-2-600x400.jpg",
    },{
      nome: "Estrogonoff",
      qtd: 55,
      descricao: "Misturado com queijo, carnes e leite em po",
      rating: 4,
      img:
        "https://portal-amb-imgs.clubedaana.com.br/2018/07/estrogonofe-de-frango-2-600x400.jpg",
    },
    {
      nome: "Estrogonoff",
      qtd: 55,
      descricao: "Misturado com queijo, carnes e leite em po",
      rating: 4,
      img:
        "https://portal-amb-imgs.clubedaana.com.br/2018/07/estrogonofe-de-frango-2-600x400.jpg",
    }
  ];
  let rid = null;
  if(props.location.data === undefined){
    props.history.push('/')
  }else{
    rid = props.location.data;
  }
  useEffect(() => {
    console.log('fetching')
    props.onFetchPratos(rid)
  },[])
  let componentPratos = 'Carreguei aeee';
  if(props.pratos){
    const keys = Object.keys(props.pratos.pratos);
    componentPratos = keys.map(key => {
      
      return (
        <div style={{width: '300px', display: 'inline-block', padding: '5px'}}>
          <Prato prato={props.pratos.pratos[key]}></Prato>
        </div>
      );
    })
  }
  // componentPratos = props.pratos.pratos.map((prato) => {
    // return (
    //   <div style={{width: '300px', display: 'inline-block', padding: '5px'}}>
    //     <Prato prato={prato}></Prato>
    //   </div>
    // );
  // });
  return (
    <div className="p-grid">
    <div className="p-col-3 p-md-1"></div>
    <div className="p-col-6 p-md-10">
      {props.pratos.loading ? <Spinner></Spinner> : 
      <>
      <h1>Fazem sucesso </h1>
      <ScrollPanel style={{whiteSpace: "nowrap", overflowX:"none"}}>
        {componentPratos}
      </ScrollPanel>
      <h3>Demais Pratos deliciosos</h3>
      <List pratos={props.pratos} rid={props.location.data}></List>
      </>
      }
    </div>
    {/* <div className="p-col-3" /> */}
  </div>
  )
}

const mapStateToProps = (state) => ({
  pratos: state.pratos
})

const mapDispatchToProps = dispatch => {
  return {
    onFetchPratos: (rid) => {dispatch(actions.fetchPratosRestaurante(rid))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurante)
