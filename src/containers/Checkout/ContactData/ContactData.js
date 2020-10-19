import React,{Component} from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{

    state = {
      name : '',
      email : '',
      address : {
        street : '',
        postalCode : ''
      },
      isLoading : false
    };

    orderHandler = (event)=>{
      event.preventDefault();
      console.log(this.props);
      this.setState({
        isLoading : true
      });
      const order = {
          ingredients : this.props.ingredients,
          price : this.props.price,
          customer : {       
              //dummy customers object
              name : "Customer-TEST",
              address : {
                  street : "test-street",
                  city : "test-city",
                  country : "test-country",
                  zipCode : "XXXXXX"
              },
              email: "test@host.com"
          },
          deliveryType : "fast"
      }
      axios.post('/orders.json',order)
        .then((response)=>{
          this.setState({
              isLoading : false
          })
          console.log("Response is : ",response);
          // alert("Order placed",order);
        })
        .catch((error)=>{
          this.setState({
              isLoading : false
          })
          console.log("Some error occured while placing order",error);
        });
        this.props.history.push('/');
    }

    render(){
      let form = (
        <form>
              <input type="text" name="name" placeholder="Name" />
              <input type="email" name="email" placeholder="Email" />
              <input type="text" name="street" placeholder="Street" />
              <input type="text" name="postalCode" placeholder="Postal Code" />
              <Button btnType="Success" clicked={this.orderHandler}>ORDER NOW</Button> 
            </form>
      );
      if(this.state.isLoading){
        form = <Spinner />;
      }
      return(
        <div className={styles.ContactData}>
            <h4>Enter your contact details</h4>
            {form}
        </div>
      )
    }
}

export default ContactData;