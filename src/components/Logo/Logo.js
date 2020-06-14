import React from 'react';

// import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <span style={{color: 'white'}}></span>
    </div>
);

export default logo;