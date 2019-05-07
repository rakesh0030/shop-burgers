import React from 'react';

import styles from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';


const modal = (props)=>(
    <>
    <Backdrop show_property={props.show_property} click={props.click}/>
    <div className={styles.Modal}
    style={{
            transform: props.show_property ? 'translateY(0)' : 'translateY(-100vh)' ,
            opacity:props.show_property ? '1' : '0'}
            }
    >
        {props.children}
    </div>
    </>
)

export default modal;