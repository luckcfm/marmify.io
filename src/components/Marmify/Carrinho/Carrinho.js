import classes from './Carrinho.module.css';
import React, { Component } from 'react'
import { connect } from 'react-redux'

export const Carrinho = (props) => {
  const totalCarrinho = props.carrinho.pratos.length;
  let showNotify = null;
  if(totalCarrinho > 0) {
    showNotify = true;
  }
  return (

    <span className={classes.Carrinho}>
     {showNotify ?  <span className={classes.Badge}>3</span> : null}
      <i
        style={{ 'fontSize': '2em', color: 'white', cursor: 'pointer' }}
        className="pi pi-shopping-cart">

      </i>
    </span>
  )
}

const mapStateToProps = (state) => ({
  carrinho: state.carrinho
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Carrinho);
