import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./Register";
import LoginForm from "./Login-form";
import { BrowserRouter, Route , Link } from "react-router-dom";

const App = () => {
    return(
        <BrowserRouter>
            <div>
                <ul>
                    
                    <li><Link to = "/Register">Register</Link></li>
                    <li><Link to = "/Login-form">Login</Link></li>
                </ul>
                <Route path ="/Register" component={Register}/>
                <Route path ="/Login-form" component={LoginForm}/>
                
            </div>
        </BrowserRouter>
    )
}
export default App;