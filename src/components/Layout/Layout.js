import React,{Component} from 'react';
import styles from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component{

    state={
        showSideDrawer : false
    }

    sideDrawerClosedHandler=()=>{
        this.setState({
            showSideDrawer:false
        });
    }

    sideDrawerToggleHandler =()=>{
        const draw_cur = this.state.showSideDrawer;
        this.setState({
            showSideDrawer:!draw_cur
        })
    }

    render(){
    return(<>
    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
    <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
    <main className={styles.Content}>
        {this.props.children}
    </main>
    </>);}
}

export default  Layout;