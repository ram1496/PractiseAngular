import React, { Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {todos: [
            // { id: 1, description: 'Learn React' ,done:false,targetDate:new Date()},
            //         {id:2,description:'Learn Java',done:false,targetDate:new Date()},
            //         {id:3,description:"Learn India",done:false,targetDate:new Date()}
            ],
            message : null
        }
        this.deleteTodoClicked= this.deleteTodoClicked.bind(this)
        this.refreshTodos= this.refreshTodos.bind(this)
        this.updateTodoClicked=this.updateTodoClicked.bind(this)
        this.addTodoClicked=this.addTodoClicked.bind(this)
    }

    componentDidMount(){
        this.refreshTodos();
    }

    refreshTodos(){
        let username = AuthenticationService.getLoggedInUser();
        TodoDataService.retrieveAllTodos(username).then(
            response=>{
                this.setState({todos:response.data})
            }
        )
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUser()
        TodoDataService.deleteTodo(username,id).then(response=>{
            this.setState({message:`Delete of todo ${id} successful`})
            this.refreshTodos();
        })

    }
    addTodoClicked(){
        this.props.navigate(`/todos/-1`)
    }
    updateTodoClicked(id){
        this.props.navigate(`/todos/${id}`)
    }
    render() {
        return (
            <div className="container">
                <h1>List Todos</h1>
               {this.state.message&&<div className="alert alert-success">{this.state.message}</div>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>description</th>
                            <th>Target Date</th>
                            <th>Is Completed?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.todos.map(todo=>
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>{todo.done.toString()}</td>
                            <td>{todo.targetDate.toString()}</td>
                            <td><button className="btn btn-info" onClick={()=>this.updateTodoClicked(todo.id)}>Update</button></td>
                            <td><button className="btn btn-warning" onClick={()=>this.deleteTodoClicked(todo.id)}>Delete</button></td>
                        </tr>
                        )}
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button></div> 
            </div>
        )
    }
}


export default ListTodosComponent
