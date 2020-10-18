import React,{Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE ={
    salad:0.5,
    cheese :0.6,
    meat : 1.4,
    bacon : 1.5
};

class BurgerBuilder extends Component{

    state={ 
        ingredients:null,
        totalPrice : 0,
        purchasable:false,
        purchasing:false,
        isLoading : false,
        isIngredientsFetchErr : null
    }

    componentDidMount = ()=>{
        axios.get('/ingredients.json')
          .then((response)=>{
              console.log("responded ingredients are",response.data);
              this.setState({
                  ingredients : response.data
              })
          })
          .catch((err)=>{
              console.log(err);
              this.setState({
                  isIngredientsFetchErr : err
              })
          })
    }

    updatePurchaseState = (ingredients)=>{
       const sum = Object.keys(ingredients)
       .map(igKey=>{
           return ingredients[igKey];
       })
       .reduce((sum,el)=>{
           return sum+el;
       },0);
       this.setState({purchasable: sum>0});
    }

   addIngredientHandler=(type)=>{
        const Oldcount = this.state.ingredients[type];
        const Updcount = Oldcount+1;
        const UpIng = {...this.state.ingredients};
        const UpdPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        UpIng[type]=Updcount;
        this.setState({
            ingredients:UpIng,
            totalPrice:UpdPrice
        });
        this.updatePurchaseState(UpIng);
   }

   removeIngredientHandler=(type)=>{
    const Oldcount = this.state.ingredients[type];
        if(Oldcount===0)
        return;
        const Updcount = Oldcount-1;
        const UpIng = {...this.state.ingredients};
        const UpdPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        UpIng[type]=Updcount;
        this.setState({
            ingredients:UpIng,
            totalPrice:UpdPrice
        });
        this.updatePurchaseState(UpIng);
   }
   

   purchasseHandler=()=>{
      // console.log('llll');
       this.setState({
           purchasing:true
       })
   }

   purchaseCancelHandler = ()=>{
       this.setState({
           purchasing:false
       })
   }

   purchaseContinueHandler =()=>{
    //    alert('Continue');

        /*

        For Firebase if we want to post any data in a new node we add that node after
        forward-slash('/'). Also ".json" is needed to appended in case of firebase so that 
        it functions properly.
        In below case final end-point that axios instance will hit is baseURL + /node.json that
        is : "https://shop-burger.firebaseio.com/orders.json"

        */    
        this.setState({
            isLoading : true
        });
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
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
                isLoading : false,
                purchasing :  false
            })
            console.log("Response is : ",response);
            // alert("Order placed",order);
          })
          .catch((error)=>{
            this.setState({
                isLoading : false,
                purchasing : false
            })
            console.log("Some error occured while placing order",error);
          });
   }

   
    render(){
        
        const disabledKey = { ...this.state.ingredients};

        for(let key in disabledKey)
        {
            disabledKey[key]=disabledKey[key] <= 0 ? true : false;
        }

        let orderElement = this.state.ingredients ? (<OrderSummary ingredients={this.state.ingredients} canceled={this.purchaseCancelHandler}
            continued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
        />) : null;
        if (this.state.isLoading) {
            orderElement = <Spinner />
        }

        let burgers = this.state.ingredients ? (
        <>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredientadded={this.addIngredientHandler} 
        ingredientremoved = {this.removeIngredientHandler}
        dis = {disabledKey}
        Price={this.state.totalPrice}
        order_dis={!this.state.purchasable}
        ordered={this.purchasseHandler}
        />
        </>) : <Spinner />;

        if(this.state.isIngredientsFetchErr){
            burgers = <p>Unable to fetch Ingredients!</p>
        }
        
        return (
            <>
            <Modal show_property={this.state.purchasing} click={this.purchaseCancelHandler}>
                {orderElement}
            </Modal>
            
             {burgers}
            </>
        )
    }
}

export default withErrorHandler(BurgerBuilder , axios);