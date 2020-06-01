import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "primereact/card";
import {Rating} from 'primereact/rating';
import * as actions from '../../../store/actions/index'
import classes from './CardRestaurante.module.css';

export const CardRestaurante = (props) => {
  console.log(props.restaurante.id);
  console.log(props.stars[props.restaurante.id].stars)
  let totalStars = 0;
  let maiorMedia = 0;
  let index = 0;
  try{
    Object.keys(props.stars[props.restaurante.id].stars).map(star => {
      console.log(star)
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
  const header = <img alt="Card" src="https://iguatemiflorianopolis.com.br/wp-content/uploads/2020/04/Logo-Coco-Bambu-Si%CC%81mbolo-Acima-1-1024x714.png" />;
  const footer = (
    <span>
      <Rating value={index} onChange={(e) =>
      props.onAddRating(props.restaurante.id, e.value, props.user.uid)
      } />
      ({totalStars} Avaliacoes.)
    </span>
  );
 
  
  return (
    <div className={classes.Card}>
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
