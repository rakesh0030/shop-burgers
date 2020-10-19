import { checkPropTypes } from 'prop-types';
import React from 'react';

import Burger from '../../Burger/Burger';

import Button from '../../UI/Button/Button';

import styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) =>{
    return (
      <div className={styles.CheckoutSummary}>
        <h1>
          Hope! it tastes well...
        </h1>
        <div style={{width: '300px' , height : '300px' , margin:'auto'}}>
          <Burger ingredients = {props.ingredients}/>
        </div>
        <Button btnType="Danger" clicked>CANCEL</Button>
        <Button btnType="Success" clicked>CONTINUE</Button>
      </div>
    )
}

export default checkoutSummary;