import React, { Component } from 'react';
import Pratos from '../../components/Marmify/Pratos/Pratos';

class Homepage extends Component {
  render() {
    return (
      <div>
        <div style={{width: '300px' }}>
        <Pratos img="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"></Pratos>
        </div>
      </div>
    );
  }
}

export default Homepage;