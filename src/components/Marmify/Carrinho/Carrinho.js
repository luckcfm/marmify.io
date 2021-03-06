import classes from './Carrinho.module.css';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import ResumoCompra from './ResumoCompra';

export const Carrinho = (props) => {
  const totalCarrinho = props.carrinho.pratos.length;
  const [showCheckout, setShowCheckout] = useState(false);
  const pratos = props.carrinho.pratos;
  console.log(props.user);
  pratos.user = {
    id: props.user.name,
    address: props.user.street
  }
  let showNotify = null;
  if(totalCarrinho > 0) {
    showNotify = true;
  }
  const checkoutHanlder = () => {
    setShowCheckout(true);
  }
  const hideCheckout = () => {
    console.log('[MODAL] - Called!')
    setShowCheckout(false);
  }
  
  return (
<>
    <span onClick={checkoutHanlder} className={classes.Carrinho}>
     {showNotify ?  <span className={classes.Badge}>{totalCarrinho}</span> : null}
      <i
        style={{ 'fontSize': '2em', color: 'white', cursor: 'pointer' }}
        className="pi pi-shopping-cart">

      </i>
      
    </span>
    <ResumoCompra 
      showModal={showCheckout} 
      pratos={pratos} 
      hideModal={hideCheckout}>
    </ResumoCompra>
    </>
  )
}

const mapStateToProps = (state) =>{
  return {
    carrinho: state.carrinho,
    user: state.auth.user
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, null)(Carrinho);
