import React,{Component} from "react";
import Login from './Login'
import Welcome from './Welcome'
import { BrowserRouter as Router,Link,Route, Routes } from "react-router-dom";
import withNavigation from "./withNavigation";
import withParams from "./withParams";
import ListTodosComponent from "./ListTodosComponent";
import AuthenticationService from "./AuthenticationService";
import AuthenticatedRoute from "./AuthenticatedRoute";
import TodoComponent from "./TodoComponent";


class TodoApp extends Component{
    

    render(){
        const LoginWithNavigation = withNavigation(Login);
        const WelcomeWithParams = withParams(Welcome);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const ListTodoComponentWithNavigation =withNavigation(ListTodosComponent)
        const TodoComponentWithParams = withParams(TodoComponent)
        return (
            <div className="TodoApp">
                
                <Router>
                <HeaderComponentWithNavigation/>
                <Routes>
                        <Route path="/" element={<LoginWithNavigation />} />
                        <Route path="/login" element={<LoginWithNavigation />} />
                        <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>} />
                        <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeWithParams /></AuthenticatedRoute>} />
                        <Route path="/todos" element={<AuthenticatedRoute><ListTodoComponentWithNavigation /></AuthenticatedRoute>} />
                        <Route path="/todos/:id" element={<AuthenticatedRoute><TodoComponentWithParams /></AuthenticatedRoute>} />
                        <Route path="*" element={<ErrorComponent />} />
                </Routes>
                <FooterComponent/>
                </Router>
                
                {/* <Login></Login>
                <Welcome></Welcome> */}
                
            </div>
        )
    }
}

class ErrorComponent extends Component{
    render(){
        return (
            <div> this is a error page since the page you are looking for is not found</div>
        )
    }
}

class HeaderComponent extends Component{
    render(){
        let isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        let username = AuthenticationService.getLoggedInUser();
        console.log(isUserLoggedIn);
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <Link to='welcome/{this.}'>ram</Link>
                    <ul className= "navbar-nav">
                        {isUserLoggedIn &&<li><Link  className="nav-link" to="/welcome/:name">Home</Link></li>}
                        {isUserLoggedIn &&<li><Link className="nav-link" to="/todos" >Todos</Link></li>}
                    </ul>
                    <ul className= "navbar-nav navbar-collapse justify-content-end">
                    {!isUserLoggedIn &&<li ><Link className="nav-link" to="/login">Login</Link></li>}
                       {isUserLoggedIn && <li ><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component{
    render(){
        return (
            <div>
            <footer className="footer">
                <span className="text-muted">All rights reserved 2018 @ram</span>
            </footer>
            </div>
        )
    }
}

class LogoutComponent extends Component{
    render(){
        return(
            <div>
           <h1>You are logged out</h1> 
           Thank you for using our application
           </div>

        )
    }

}
export default TodoApp