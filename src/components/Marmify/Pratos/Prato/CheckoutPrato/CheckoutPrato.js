import React, { useState, useEffect } from 'react'
import { Card } from "primereact/card";
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import * as actions from '../../../../../store/actions/index'
import Modal from '../../../../UI/Modal/Modal';
import comida_padrao from '../../../../../assets/comida_padrao.jpg'

function CheckoutPrato(props) {
  const rid = props.rid;
  const prato = props.prato;
  const [checkoutPrato, setCheckoutPrato] = useState({});
  let img_prato = null;
  if (!prato || !prato.foto) {
    img_prato = <div className="p-col-12" style={{ float: 'center', margin: '0 auto' }}><img style={{ height: '200px', float: 'center', margin: '0 auto' }} alt="Foto prato" src={comida_padrao}></img></div>
  } else {
    img_prato = <div className="p-col-12"><img alt="Foto prato" src={prato.foto}></img></div>
  }
  if(Object.keys(checkoutPrato).length === 0 && Object.keys(props.prato).length > 0){
    //inicializamos o prato caso o mesmo nao exista.
    const newPrato = {...prato}
    newPrato.itens_escolhidos = [];
    newPrato.preco_items = 0;
    setCheckoutPrato(newPrato);
  }

  const addItem = (item) => {
    const newCheckoutPrato = {...checkoutPrato};
    if(Object.keys(newCheckoutPrato).length === 0){
      //inicializamos o prato caso o mesmo nao exista.
      const newPrato = {...prato}
      newPrato.itens_escolhidos = [];
      newPrato.itens_escolhidos.push(item);
      newPrato.preco_items = 0;
      newPrato.preco_items += parseFloat(item.preco_item);
      setCheckoutPrato(newPrato);
    }else{
      const newPrato = {...checkoutPrato};
      if(!newPrato.itens_escolhidos){
        newPrato.itens_escolhidos = [];
      }
      newPrato.preco_items += parseFloat(item.preco_item);
      newPrato.itens_escolhidos.push(item);
      setCheckoutPrato(newPrato);
    }
   
    
  }
  const removeItem = (item) => {
    console.log('removing item ', item);
  }
  const addCarrinho = (prato) => {
    console.log('[CHECKOUT]', prato);
    props.onAddCarrinho(prato,rid);
    props.modalClosed();
    setCheckoutPrato({});
  }
  const totalItem = () => {
    
    let preco_base = parseFloat(prato.preco_base);
    let total = preco_base
    if(checkoutPrato.itens_escolhidos){
      checkoutPrato.itens_escolhidos.map(item => {
        total += parseFloat(item.preco_item);
      })
    }
    return total.toFixed(2);
  }
  return (
    <Modal show={props.showModal} modalClosed={props.modalClosed}>
      <Card title={prato.nome_prato} subTitle={props.prato.descricao}>
        {img_prato}
        {props.prato.descricao}
        <h3>Itens</h3>
        <i>Selecione os itens adicionais para adicionar ao seu pedido.</i>
        <ul>
          {prato.itens && prato.itens.map(item => {
            let escolhidos = [];
            if(checkoutPrato.itens_escolhidos) {
              escolhidos = checkoutPrato.itens_escolhidos.filter(myItem => {
                if(myItem.nome_item === item.nome_item)
                {
                  return myItem;
                }
              })
            }
            return <><li>
              {item.nome_item} (<b>R$ {item.preco_item}</b>)
              <span style={{float: 'right'}}>
                {escolhidos.length}
                <i onClick={()=> addItem(item)} className="pi pi-plus" style={{cursor: 'pointer'}}></i>
                <i onClick={()=>removeItem(item)} className="pi pi-minus" style={{cursor: 'pointer'}}></i>
              </span>
            </li>
            <br></br>
            </>
          })}
        </ul>
        <hr></hr>
        <span style={{ float: 'right' }}>Total: <b>R$ {totalItem()}</b></span>
        <br></br>
        <div style={{ float: 'right' }}>
        
        </div>
        <br></br>
        <br></br>
      </Card>
      <Button 
            onClick={() => {console.log('cancelando.')}}
            className="p-button-danger" 
            label="Cancelar"></Button>

          <Button 
            label="Adicionar ao carrinho" 
            onClick={()=> {
              addCarrinho(checkoutPrato)
              }}>

            </Button>
    </Modal>
  )
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddCarrinho: (prato,rid) => {dispatch(actions.addCarrinho(prato,rid))}
  }
}

export default connect(null,mapDispatchToProps)(CheckoutPrato);