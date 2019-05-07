import React from 'react';

import BuildControl from './BuildControl/BuildControl';


import styles from './BuildControls.module.css';


const controls =[
    {label:'Salad',type:'salad'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
    {label:'Bacon',type:'bacon'}
]

const buildControls = (props)=>{
    console.log('kkk');
    return(
    <div className={styles.BuildControls}>
        <p>Current Price : <b>{props.Price.toFixed(2)}</b></p>
    {controls.map(ctrl=>(
        <BuildControl key={ctrl.label} label={ctrl.label} added={()=>props.ingredientadded(ctrl.type)} 
        removed={()=>props.ingredientremoved(ctrl.type)}
        dis={props.dis[ctrl.type]}
        />
    ))}
    <button disabled={props.order_dis} className={styles.OrderButton} onClick={props.ordered}>Order Now</button>
    </div>
    );}

export default buildControls;