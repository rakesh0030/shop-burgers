import React from 'react';

import styles from './Logo.module.css'

import burgerLogo from '../../assets/images/burger-logo.png';

const logo=(props)=>{

    return(<div className={styles.Logo} style={{height:props.height}}>
        <img src={burgerLogo} alt="My Burger"/>    
        </div>);
}

export default logo;