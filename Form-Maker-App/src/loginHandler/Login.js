import React, { Fragment } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import   '../css/loginPageStyle.css';


class Login extends React.Component {
    constructor(props) {
        super(props)

        
    }


    render() {
        return (
            <Fragment>



<div className="loginContainer">
        <div className="row">
			<div className="col-md-5 mx-auto box">
			    <div id="first">
				    <div className="myform form ">
					    <div className="logo mb-3">
						    <div className="col-md-12 text-center">
							    <h1>Login</h1>
                            </div>
                        </div>
                    
                   <form action="" method="post" name="login">
                           <div className="form-group">
                              <label for="exampleInputEmail1">Email address</label>
                              <input type="email" name="email"  className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                           </div>
                           <div className="form-group">
                              <label for="exampleInputEmail1">Password</label>
                              <input type="password" name="password" id="password"  className="form-control" aria-describedby="emailHelp" placeholder="Enter Password"/>
                           </div>
                           
                           <div className="col-md-12 text-center ">
                              <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                           </div>
                           <div className="col-md-12 ">
                              <div className="login-or">
                                 <hr className="hr-or"/>
                                 <span className="span-or">or</span>
                              </div>
                           </div>
                           <div className="col-md-12 mb-3">
                              <p className="text-center">
                                 <a href="javascript:void();" className="google btn mybtn"><i className="fa fa-google-plus">
                                 </i> Signup using Google
                                 </a>
                              </p>
                           </div>
                           <div className="form-group">
                              <p className="text-center">Don't have account? <Link to="/signup" id="signup">Sign up here</Link></p>
                           </div>
                        
                        
                    </form>
                    </div>
                 
				</div>
			</div>
			
            
            
           
		</div>
</div>   
         


            </Fragment>
        )
    }
    
}


export default Login; 