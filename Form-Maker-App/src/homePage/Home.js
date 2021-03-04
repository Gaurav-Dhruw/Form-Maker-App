import React, { Fragment } from "react";
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";
import Login from "../loginHandler/Login"
import Signup from "../loginHandler/Signup";
import App from "./App";
import Navbar from "./Navbar";
import "../css/homeStyle.css";

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
                    <div className="homeCont">
                        <div id="welcomeCont">
                            <div id="welcomeTitle">
                            <h2>Welcome to Form Control</h2>
                            <p>Creation and handling of forms made easy</p>
                            </div>
                            <div className="infoCont">
                            
                            <p class="js-nametag">Collect survey data for free</p>
                            
                            <p class="js-nametag">Safe and Secure </p>

                            <p class="js-nametag">Have the control of all the data</p>
                           

                            <p class="js-nametag">Highly efficient</p>
                           

                            <p class="js-nametag">Elegant form design</p>
                            </div>
                        </div>
                        <div id="createCont">
                            {/* <h4>Let's Get Started</h4> */}
                        <Link to="/App" id="getStartedBtn">Get Started</Link>
                    {/* <br></br> */}
                    {/* <Link to="/login">Login</Link> */}
                    {/* <br></br> */}
                    {/* <Link to="/signup">Sign Up</Link> */}
                    </div>

                        </div>
                        {/* <div className="infoCont">
                            

                        </div> */}

                    

                    </Route>

                
                </Switch>

           

            
            </Router>
            </Fragment>
        )
    }
    
}


export default Home;
