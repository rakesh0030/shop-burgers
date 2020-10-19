import React from 'react';

import styles from './Order.module.css';

const order = (props)=>{
  let ingredients = [];
  for(let key in props.ingredients){
    ingredients.push(key + '(' + props.ingredients[key] + ')');
  }
  ingredients = ingredients.map((igr)=>{
    return <span key={igr} style={{textTransform : 'capitalize',display:'inline-block',margin:'0 8px',border:'1px solid #ccc',padding:'5px'}}>
      {igr}
    </span>
  })
  return(
    <div className={styles.Order}>
        <p>Ingredients : {ingredients}</p>
  <p>Price : <strong>USD {props.price}</strong></p>
    </div>
  )
}

export default order;