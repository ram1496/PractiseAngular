import { Component } from "react";
import CounterButton from "./CounterButton";

class Counter extends Component{
    constructor(){
        super()
        this.state = {
          counter:0
    
        }
        //we need to bind method to class in the constructor
        this.increment=this.increment.bind(this);
        this.decrement=this.decrement.bind(this);
        this.reset=this.reset.bind(this);
      }

    render(){
        return(
            <div className="counter">
        <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <span className="count">{this.state.counter}</span>
        <div><button className="reset" onClick={this.reset}>Reset</button></div>
      </div>
        );
    }

    increment(by){
        console.log(`increment from parent is ${by}`)
        this.setState({
          counter : this.state.counter+by
        })
      }
    decrement(by){
        console.log(`decrement from parent is ${by}`)
        this.setState({
          counter : this.state.counter - by
        })
      }

    reset(){
        this.setState({
            counter : 0
          })
    }
}

export default Counter