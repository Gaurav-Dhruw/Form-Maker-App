import React, { Fragment } from "react";
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";
import Login from "../loginHandler/Login"
import Signup from "../loginHandler/Signup";
import App from "./App";
import Navbar from "./Navbar";

class Home extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    render(){
        return(<Fragment>
            <Router>
                <Navbar></Navbar>
                <Switch>
                    <Route path="/App">
                    <App></App>
                    </Route>
                   
                   
                    <Route path="/login">
                        <Login></Login>

                    </Route>
                    <Route path="/signup">
                        <Signup></Signup>

                    </Route>
                   
                    <Route path="/">
                    <h1>HOME PAGE</h1>

                    <Link to="/App">Start Creating Form</Link>
                    <br></br>
                    <Link to="/login">Login</Link>
                    <br></br>
                    <Link to="/signup">Sign Up</Link>
                    </Route>

                
                </Switch>

           

            
            </Router>
            </Fragment>
        )
    }
    
}


export default Home;
