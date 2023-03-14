import React, { Component } from "react";
import './Counter.css';
import PropTypes from 'prop-types'

//class Component
class CounterButton extends Component {
  //Define the initial state in a constructor
  //state=>Counter 0
  //let is block scope
  //const can be used for constant
  // constructor(){
  //   super()
  //   //we need to bind method to class in the constructor
  //   this.increment=this.increment.bind(this);
  //   this.decrement=this.decrement.bind(this);
  // }
 

  render() {
    let style = {fontSize : "50px"};
    return (
      <div className="counter">
        <button onClick={()=>this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
        <button onClick={()=>this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
      </div>
    );
  }
  //if we use arrow function we don't really need to bind this variable as this happens automatically
  // increment=()=> {

    // increment(){
    //   this.props.incrementMethod(this.props.by*2)
    // }

    // decrement(){
    //   this.props.decrementMethod(this.props.by)
    // }
   
}

CounterButton.defaultProps = {
  incrementBy : 1
}

CounterButton.propTypes = {
  incrementBy : PropTypes.number
}

export default CounterButton