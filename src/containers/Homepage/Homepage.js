import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {ScrollPanel} from 'primereact/scrollpanel';
import {Row,Col} from 'react-bootstrap'
import * as actions from '../../store/actions/index';
import CardRestaurante from './CardRestaurante/CardRestaurante'
import {withRouter} from 'react-router-dom'
const Homepage = (props) => {
  useEffect(() => {
    props.onFechRestaurantes();
    props.onShowToolBar();
  },[])
  const restaurantes = Object.keys(props.user.restaurantes).map(id => {
    const rest = props.user.restaurantes[id];
    rest.id = id;
    return rest;
  })
  const goToRestaurant = (rid) => {
    props.history.push({
      pathname: "/restaurante_user",
      data: rid
    })
  }

  const restaurantesToShow = restaurantes.map(restaurante => {
    if(restaurante.name !== undefined){
      return <CardRestaurante key={restaurante.id} restaurante={restaurante} goToRestaurant={goToRestaurant} user={props.auth.user}></CardRestaurante>
    }
  });
  
  return (
    <div>
      { 
      props.auth.token !== null && props.auth.token !== undefined ? 
      <div className="p-grid">
        <div className="p-col-3"></div>
        <div className="p-col-6">
          <ScrollPanel >
            {restaurantesToShow }
          </ScrollPanel>
        </div>
        {/* <div className="p-col-3" /> */}
      </div>
     
      
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
    onFechRestaurantes: () => {dispatch(actions.fetchRestaurantes())},
    onShowToolBar: () => {dispatch(actions.showToolbar())}
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Homepage));