import React from 'react';

import styles from './Toolbar.module.css';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import NavigationItems from '../NavigationItems/NavigationItems';

import Logo from '../../Logo/Logo';

const toolbar = (props)=>(
    <header className={styles.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <Logo height="80%"/>
        <nav className={styles.DesktopOnly}>
        <NavigationItems/>
        </nav>
    </header>
)

export default toolbar;