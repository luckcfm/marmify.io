import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index';
import CardRestaurante from './CardRestaurante/CardRestaurante'
import {ScrollPanel} from 'primereact/scrollpanel';
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
      return <CardRestaurante restaurante={restaurante}></CardRestaurante>
    }
  })
  return (
    <div>
      { 
      props.auth.token !== null && props.auth.token !== undefined ? 
      
      <ScrollPanel>
        {restaurantesToShow }
      </ScrollPanel>
      
      : 
      
      
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