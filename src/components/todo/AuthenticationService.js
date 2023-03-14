import axios from "axios";

const baseURI = "http://localhost:8080/";
class AuthenticationService {
    
    executeBasicAuthenticationService(username,password){
        return axios.get(baseURI+'basicAuth',{headers:{authorization:this.createBasicAuthToken(username,password)}})
    }

    createBasicAuthToken(username,password){
        return 'Basic ' + window.btoa(username + ":" + password)
    }
    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem('authenticatedUser', username);
        
        this.setupAxiosInterceptor(this.createBasicAuthToken(username,password))
    }
    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        console.log("calling authentication service")
        let user = sessionStorage.getItem('authenticatedUser')
        console.log("checking login")
        if (user == null) {
            console.log("in false")
            return false
        } else {
            console.log("in true")
            return true
        }
    }

    getLoggedInUser() {
        return sessionStorage.getItem('authenticatedUser')
    }

    setupAxiosInterceptor(basicAuthHeader) {
        console.log(basicAuthHeader)
        axios.interceptors.request.use(
            (config) => {
                config.headers.Authorization=basicAuthHeader ;
                return config
            })
    }
}

export default new AuthenticationService()