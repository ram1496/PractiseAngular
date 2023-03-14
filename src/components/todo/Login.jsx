import React,{Component} from "react";
import AuthenticationService from "./AuthenticationService";

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : "ram",
            password : '',
            hasLoginFailed:false,
            showSuccessMessage:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event){
        console.log(this.state)
        this.setState({
            //can only assign values to constant or data member if we want variable then need to define in square brackets 
            [event.target.name]:event.target.value
        })
    }
    loginClicked(){
        // if(this.state.username==this.state.password){
        //     console.log("loginClicked "+this.state.password )
        //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
        //     console.log("successful")
        //     this.props.navigate(`/welcome/${this.state.username}`)
        // }
        // else{
        //     console.log("failed")

        //     this.setState({showSuccessMessage:false,hasLoginFailed:true})
        // }

        AuthenticationService.executeBasicAuthenticationService(this.state.username,this.state.password)
        .then(
            ()=>{
                AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
                console.log("successful")
                this.props.navigate(`/welcome/${this.state.username}`)
            }
        )
        .catch(
            ()=>{
                console.log("failed")

                this.setState({showSuccessMessage:false,hasLoginFailed:true})
                this.setState({hasLoginFailed:true})
            }
        )
    }
    render(){
        return (
            <div className="container">
                <h1>Login</h1>
            {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
            {/* <ShowSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> */}
            {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
            {this.state.showSuccessMessage&& <div>Login successfully</div>}
            User Name:<input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
            Password:<input type="password" name="password"value={this.state.password} onChange={this.handleChange}/>
            <button onClick={this.loginClicked}>Login</button>
            </div>
        );
    }

}

// function ShowInvalidCredentials(props){
//     if(props.hasLoginFailed){
//         return <div>Invalid Credentials</div>
//     }
//     return null
// }

// function ShowSuccessMessage(props){
//     if(props.showSuccessMessage){
//         return <div>Login successfully</div>
//     }
//     return null
// }

export default Login