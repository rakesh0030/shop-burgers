import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import Backdrop from '../../UI/Backdrop/Backdrop';

import styles from './SideDrawer.module.css';

const sideDrawer=(props)=>{
    let attachedClasses = [styles.SideDrawer, styles.Close];
    if(props.open){
        attachedClasses=[styles.SideDrawer,styles.Open];
    }
    return(
        <>
        <Backdrop show_property={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
        <div style={{marginBottom:'32px',height:"11%"}}>
            <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </>
    )
}
 
export default sideDrawer;