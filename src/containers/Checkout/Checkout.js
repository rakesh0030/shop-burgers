import React,{Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state={
    ingredients : {
      salad : 0,
      bacon :0,
      meat :0,
      cheese : 0
    },
    price : 0
  }

  componentDidMount = () =>{
    console.log("Props of the component is",this.props);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price;
    for(let param of query.entries()){
      if('price' == param[0]){
        price = param[1];
      }
      else{
        ingredients[param[0]] = +param[1]; //+ in beginning convert it to a number
      }    
    }
    this.setState({
      ingredients :ingredients,
      price : price
    });
  }

  checkoutCancelledHandler = () =>{
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () =>{
    this.props.history.replace("/checkout/contact-data");
  }


  render(){
    return(
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}
        price = {this.state.price}
        checkoutCancelledHandler = {this.checkoutCancelledHandler}
        checkoutContinuedHandler = {this.checkoutContinuedHandler}
        />
        {/*
        Whenever we use render with Route we do not send history,location etc props directly we 
        have to instead get props as arguements and send them as props like we did below.
        */}
        <Route 
          path={this.props.match.path + "/contact-data"} 
          render={(props)=><ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>} 
           />
      </div>
    )
  }
}

export default Checkout;