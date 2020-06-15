import React, { useState } from 'react'
import { connect } from 'react-redux'
import classes from './Notificacao.module.css'
export const Notificacao = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  let showNotify = null;
  const checkoutHanlder = () => {
    setShowCheckout(true);
  }
  const hideCheckout = () => {
    console.log('[MODAL] - Called!')
    setShowCheckout(false);
  }
  return (
    <div>
      <>
      <span onClick={checkoutHanlder} className={classes.Carrinho}>
     {showNotify ?  <span className={classes.Badge}>a</span> : null}
      <i
        style={{ 'fontSize': '2em', color: 'white', cursor: 'pointer' }}
        className="pi pi-bell">

      </i>
      
    </span>
      </>
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Notificacao)
