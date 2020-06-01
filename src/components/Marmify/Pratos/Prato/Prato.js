import React from "react";
import { Card } from "primereact/card";
import { Rating } from "primereact/rating";
import classes from './Prato.module.css'
export function PratoList(props) {
  return (
    <div className={classes.PratosList}>
     <div className={classes.ListItem}>
       <img className={classes.Image}>
       </img>
     </div>
      <div className={classes.ListItem}>
          <span className={classes.Title}>
            Teste
          </span>
          <span>
            Teste 2
          </span>
      </div>
    </div>
  );
}


export default function Prato(props) {
  const header = <img style={{height: '200px'}} alt="Card" src={props.prato.img} />;
  const footer = (
    <span>
      <span style={{ float: "right", color: "#7CF87C" }}>{props.prato.preco === undefined ? "Vendidos: " + props.prato.qtd : props.prato.preco}</span>
      <br></br>
    </span>
  );

  const titulo = (
    <>
      {" "}
      {props.prato.nome}{" "}
      <span style={{ float: "right" }}>
        <Rating
          value={props.prato.rating}
          onChange={() => {
            console.log("change");
          }}
          cancel={false}
          stars={5}
        />{" "}
      </span>
    </>
  );

  return <div>
  <Card title={titulo} footer={footer} header={header}>
    {props.prato.descricao}
  </Card>
</div>;
}
