import React,{Component} from 'react';

import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state={
    ingredients : {
      salad : 0,
      bacon :0,
      meat :0,
      cheese : 0
    }
  }

  componentDidMount = () =>{
    console.log(this.props);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for(let param of query.entries()){
      ingredients[param[0]] = +param[1]; //+ in beginning convert it to a number
    }
    this.setState({
      ingredients
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
        checkoutCancelledHandler = {this.checkoutCancelledHandler}
        checkoutContinuedHandler = {this.checkoutContinuedHandler}
        />
      </div>
    )
  }
}

export default Checkout;