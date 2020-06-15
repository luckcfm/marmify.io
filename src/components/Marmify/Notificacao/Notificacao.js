import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import classes from './Notificacao.module.css'
import * as actions from '../../../store/actions/index'
export const Notificacao = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  useEffect(()=>{
    props.onFetchNotification(props.user.uid);
  },[])
  let showNotify = null;
  const checkoutHanlder = () => {
    setShowCheckout(true);
  }
  const clearNotifications = () => {
    props.onClearNotifications(props.user.uid);
  }
  let notificationsNumber = 0;
  let msgs = [];
  if(props.notifications && props.notifications.notifications){
    Object.keys(props.notifications.notifications).map(key => {
      
      notificationsNumber += 1;
      msgs.push(props.notifications.notifications[key].msg)
    })
  }
  if(notificationsNumber > 0){
    showNotify = true;
  }
  return (
    <div>
      <>
      <span onClick={checkoutHanlder} className={classes.Carrinho}>
      <div className={classes.Notice} onMouseLeave={clearNotifications}>
  {showNotify ?  <span className={classes.Badge}>{notificationsNumber}</span> : null}
      <i
        style={{ 'fontSize': '2em', color: 'white', cursor: 'pointer' }}
        className="pi pi-bell">

      </i>
        <div>
            {msgs.map(msg => {
              return msg;
            })}
        </div>    
      </div>
    </span>
      </>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  notifications: state.notifications
})

const mapDispatchToProps = dispatch => {
  return {
    onFetchNotification: (uid) => {dispatch(actions.fetchNotifications(uid))},
    onClearNotifications: (uid) => {dispatch(actions.clearNotifications(uid))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notificacao)
