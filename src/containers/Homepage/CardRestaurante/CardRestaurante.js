import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "primereact/card";
import {Rating} from 'primereact/rating';
import * as actions from '../../../store/actions/index'
import classes from './CardRestaurante.module.css';

export const CardRestaurante = (props) => {
  const header = <img alt="Card" src="https://iguatemiflorianopolis.com.br/wp-content/uploads/2020/04/Logo-Coco-Bambu-Si%CC%81mbolo-Acima-1-1024x714.png" />;
  const footer = (
    <span>
      <Rating value={props.restaurante.rating} onChange={(e) => console.log('ha')} />
    </span>
  );
    console.log(props.restaurante);
  return (
    <div className={classes.Card}>
      <Card className={classes["p-card"]} footer={footer} title={props.restaurante.name} header={header}>
        Um restaurante com boa comida, a deliciosa comida da vo.
        Entre para conhecer.
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => {
  return {
    onAddRating: (value) => {dispatch(actions.addRating(value))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CardRestaurante);
