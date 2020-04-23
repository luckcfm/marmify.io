import React from 'react';
import { Card } from 'primereact/card';
import {Rating} from 'primereact/rating';
import {Button} from 'primereact/button';
function Pratos(props) {
  const header = <img alt="Card" src={props.img} />;
  const footer = <span>
    <span style={{float: 'right', color: '#7CF87C'}}>R$ 4.50</span>
    <br></br>
  </span>;

const titulo = <> Exemplo <span style={{float: 'right'}}><Rating value={4} onChange={() => {console.log('change')}} cancel={false} stars={5} /> </span></>
  return (
    
    <div>
      <Card title={titulo} footer={footer} header={header}>
        Delicioso combo de frutas e legumes para o seu almoco
      </Card>
    </div>
  );
}

export default Pratos;