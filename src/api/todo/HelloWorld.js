import axios from "axios";


const baseURI = "http://localhost:8080/";
class HelloWorldService{ 
    executeHelloWorldService(){
        return axios.get(baseURI+'say-hello')
    }
    executeHelloWorldBeanService(name){
        let username = 'ram'
        let password = 'ram'
        let basicAuthHeader = 'Basic '+window.btoa(username+":"+password)
        return axios.get(baseURI+`hello-bean/${name}`,
        {
            headers:{
                authorization:basicAuthHeader
            }
        });
    }
}

export default new HelloWorldService();