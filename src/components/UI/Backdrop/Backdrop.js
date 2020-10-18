import React from 'react';

import styles from './Backdrop.module.css';

const backdrop = (props)=>(
    props.show_property ? <div className={styles.Backdrop} onClick={props.click}></div> : null
)

export default backdrop;