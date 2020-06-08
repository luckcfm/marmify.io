import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "primereact/card";
import {Rating} from 'primereact/rating';
import * as actions from '../../../store/actions/index'
import classes from './CardRestaurante.module.css';

export const CardRestaurante = (props) => {

  let totalStars = 0;
  let maiorMedia = 0;
  let index = 0;
  try{
    Object.keys(props.stars[props.restaurante.id].stars).map(star => {
      totalStars += props.stars[props.restaurante.id].stars[star];
    });
  }catch(e){
    console.log(e);
  }
  try{
    Object.keys(props.stars[props.restaurante.id].stars).map((star) => {
      if(totalStars / props.stars[props.restaurante.id].stars[star] > maiorMedia){
        maiorMedia = props.stars[props.restaurante.id].stars[star];
        index = star;
      }
    });
  }catch(e){
    console.log(e)
  }
  //TODO: Favoritar restaurante!
  const header = <>
    <div>
      <img 
      alt="Card" 
      src="https://iguatemiflorianopolis.com.br/wp-content/uploads/2020/04/Logo-Coco-Bambu-Si%CC%81mbolo-Acima-1-1024x714.png" />
    </div>
  </>;
  const footer = (
    <span>
      <p><b>De a sua opiniao!</b></p>
      <Rating value={parseInt(index)} onChange={(e) =>
      props.onAddRating(props.restaurante.id, e.value, props.user.uid)
      } />
      ({totalStars} Avaliacoes.)
    </span>
  );
 
  
  return (
    <div 
      className={classes.Card} 
      onClick={() => props.goToRestaurant(props.restaurante.id)}>
      <Card className={classes["p-card"]} footer={footer} title={props.restaurante.name} header={header}>
        Um restaurante com boa comida, a deliciosa comida da vo.
        Entre para conhecer.
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stars: state.user.stars
});

const mapDispatchToProps = dispatch => {
  return {
    onAddRating: (id,value, uid) => {dispatch(actions.addRating(id,value,uid))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CardRestaurante);
