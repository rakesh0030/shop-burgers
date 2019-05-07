import React from 'react';

import styles from './BuildControl.module.css'

const buildControl = (props)=>(
    <div className={styles.BuildControl}>
    <div classes={styles.Label}>{props.label}</div>
    <button className={styles.Less} disabled={props.dis} onClick={props.removed}>Less</button>
    <button className={styles.More} onClick={props.added}>More</button>
    </div>
    )

export default buildControl;