import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index';
const Homepage = (props) => {
  useEffect(() => {
    props.onFechRestaurantes();
  },[])
  const restaurantes = Object.keys(props.user.restaurantes).map(id => {
    const rest = props.user.restaurantes[id];
    rest.id = id;
    return rest;
  })
  const restaurantesToShow = restaurantes.map(restaurante => {
    if(restaurante.name !== undefined){
      return <p>{restaurante.name}</p>
    }
  })
  return (
    <div>
      { 
      props.auth.token !== null && props.auth.token !== undefined ? restaurantesToShow : 
      
      
      <p>Please <a onClick={() => {props.history.push('/login')}}>login</a> to continue</p>}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFechRestaurantes: () => {dispatch(actions.fetchRestaurantes())}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Homepage);