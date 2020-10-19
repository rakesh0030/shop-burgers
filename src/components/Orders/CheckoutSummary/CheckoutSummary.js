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
        <div style={{width: '100%', margin:'auto'}}>
          <Burger ingredients = {props.ingredients}/>
        </div>
        <Button btnType="Danger" clicked={props.checkoutCancelledHandler}>CANCEL</Button>
        <Button btnType="Success" clicked={props.checkoutContinuedHandler}>CONTINUE</Button>
      </div>
    )
}

export default checkoutSummary;