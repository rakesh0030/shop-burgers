import React,{Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapppedComponent,axios) => {
  return class extends Component  {
    
    
    constructor(props){
      super(props);
      axios.interceptors.request.use(req=>{
        this.setState({
          hasError : null
        })
        return req;
      })
      axios.interceptors.response.use(res => res,error => {
        console.log("error",error);
        this.setState({
          hasError : error
        })
      }
      )
      this.state = {
        hasError : null
      }
    }

    /*
      Removing below code of handling error from componenetDidMount to constructor 
      so that we can make sure that it runs always.
      since componentDidMount only executes after all child component are done rendering...
      it may be a case when we want to display it before rendering of all element is done
      like get request of ingredients will not be handled if have any error if this code
      is in componentDidMount
    */
   /*
    componentDidMount(){
      axios.interceptors.request.use(req=>{
        this.setState({
          hasError : null
        })
        return req;
      })
      axios.interceptors.response.use(res => res,error => {
        console.log("error",error);
        this.setState({
          hasError : error
        })
      }
      )
    }
    */

    errorClickedHandler = ()=>{
      this.setState({
        hasError : null
      })
    }

    render() {
      return (
        <>
          <Modal show_property={this.state.hasError} click={this.errorClickedHandler}>
           {this.state.hasError ? this.state.hasError.message : null}
          </Modal>
          <WrapppedComponent {...this.props} />
        </>
      );
      }
    
  }
}


export default withErrorHandler;










/*

Whenever we are using a hoc like hoc(wrappedcomponent), in those cases we return a component like 
above which has Wrapped component and props spread using spread(...) operator


*/