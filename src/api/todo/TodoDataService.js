import axios from "axios";
const baseURI = "http://localhost:8080/";
class TodoDataService{
    retrieveAllTodos(name){
        return axios.get(baseURI+`users/${name}/todos`)
    }

    deleteTodo(name,id){
        return axios.delete(baseURI+`users/${name}/todos/${id}`)
    }

    updateTodo(name,id,todo){
        return axios.put(baseURI+`users/${name}/todos/${id}`,todo)
    }

    createTodo(name,todo){
        return axios.post(baseURI+`users/${name}/todos`,todo)
    }

    retrieveTodo(name,id){
        return axios.get(baseURI+`users/${name}/todos/${id}`)
    }
}

export default new TodoDataService()