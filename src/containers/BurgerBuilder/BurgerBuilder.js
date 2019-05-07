import React,{Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE ={
    salad:0.5,
    cheese :0.6,
    meat : 1.4,
    bacon : 1.5
};

class BurgerBuilder extends Component{

    state={
        ingredients:{
            salad:0,
            bacon:0,
            meat:0,
            cheese:0
        },
        totalPrice : 0,
        purchasable:false,
        purchasing:false
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
       alert('Continue');
   }

    render(){
        
        const disabledKey = { ...this.state.ingredients};

        for(let key in disabledKey)
        {
            disabledKey[key]=disabledKey[key] <= 0 ? true : false;
        }
        
        return (
            <>
            <Modal show_property={this.state.purchasing} click={this.purchaseCancelHandler}>
                <OrderSummary ingredients={this.state.ingredients} canceled={this.purchaseCancelHandler}
                continued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
                />
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls ingredientadded={this.addIngredientHandler} 
            ingredientremoved = {this.removeIngredientHandler}
            dis = {disabledKey}
            Price={this.state.totalPrice}
            order_dis={!this.state.purchasable}
            ordered={this.purchasseHandler}
            />
            </>
        )
    }
}

export default BurgerBuilder;