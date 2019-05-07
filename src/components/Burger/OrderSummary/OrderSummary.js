import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props)=>{
    const ingredientsSummary = Object.keys(props.ingredients)
    .map(igKey=>{
        return (<li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>);
    });


    return(<>
    <h3>Order Summary</h3>
    <p>A delicious Burger with following ingredients:</p>
    <ul>
    {ingredientsSummary}
    </ul>
    <p>Continue to Checkout?</p>
    <h3>Price : {props.price.toFixed(2)}</h3>
    <Button btnType="Success" clicked={props.continued}>Continue</Button>
    <Button btnType="Danger" clicked={props.canceled}>Cancel</Button>
    </>);
}

export default orderSummary;