import React, { useState } from "react";
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import { InputText } from "primereact/inputtext";
const pratoInicial = { 
  nome_prato: "",
  descricao: "", 
  itens: [], 
  preco_base: 0.0, 
  totalItem: 0.0,
  rating: 0,
  pedidos: 0,
  totalVendido: 0.0
}
const NovoPrato = function (props) {
  const [state, setState] = useState(pratoInicial);
  const [item, setItem] = useState({preco_item:0, nome_item:''})
  const {itens} = state;
  const handleChange = (evt) => {
    const newState = {...state};
    newState[evt.target.name] = evt.target.value;
    setState(newState);
  }
  const handleChangeItem = (evt) => {
    const newItem = {...item};
    newItem[evt.target.name] = evt.target.value;
    setItem(newItem);
  }
  const handlerAddItem = (evt) => {
    evt.preventDefault();
    const newState = {...state}
    itens.push(item);
    newState.itens = itens;
    newState.totalItem = newState.totalItem + parseFloat(item.preco_item);
    setState(newState);
    setItem({preco_item:0, nome_item:''})
  }
  const handleSave = (evt) => {
    evt.preventDefault();
    props.onSavePrato(state, props.user);
  }
  return (
    <div>
      <InputText
        value={state.name}
        placeholder="Nome do prato"
        name="nome_prato"
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <InputText
        value={state.descricao}
        placeholder="Descricao"
        name="descricao"
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <InputText
        value={state.preco_base}
        name="preco_base"
        placeholder="Preco base"
        onChange={handleChange}

      />
      <br></br>
      <br></br>
      <hr></hr>
      <h3>Itens</h3>
      {itens.map(itemL => {
        return <li>{itemL.nome_item} - {itemL.preco_item}</li>
      })}
      <b>Total do item: </b> {state.totalItem + parseFloat(state.preco_base)} <br></br>
      <input type="text" name="nome_item" value={item.nome_item} placeholder="Nome item" onChange={handleChangeItem} />
      <input type="text" name="preco_item" value={item.preco_item} placeholder="Preco item" onChange={handleChangeItem}/>
      <button onClick={handlerAddItem}>Adicionar</button>
      
      <br></br>
      <br></br>
      <button onClick={handleSave}>Salvar Prato</button>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSavePrato: (prato,user) => {dispatch(actions.registrarPrato(prato,user))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NovoPrato);