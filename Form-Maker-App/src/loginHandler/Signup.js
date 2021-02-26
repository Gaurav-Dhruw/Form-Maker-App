import React, { Fragment } from "react";
import   '../css/loginPageStyle.css';

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";


class Signup extends React.Component {
    constructor(props) {
        super(props)

        
    }


    render() {
        return (
            <Fragment>



<div className="loginContainer">
        <div className="row">
			<div className="col-md-5 mx-auto box">

                <div id="second">
			      <div className="myform form ">
                        <div className="logo mb-3">
                           <div className="col-md-12 text-center">
                              <h1 >Signup</h1>
                           </div>
                        </div>
                        <form action="#" name="registration">
                           <div className="form-group">
                              <label for="exampleInputEmail1">User name</label>
                              <input type="text"  name="firstname" className="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Enter username"/>
                           </div>
                           
                           <div className="form-group">
                              <label for="exampleInputEmail1">Email address</label>
                              <input type="email" name="email"  className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                           </div>
                           <div className="form-group">
                              <label for="exampleInputEmail1">Password</label>
                              <input type="password" name="password" id="password"  className="form-control" aria-describedby="emailHelp" placeholder="Enter Password"/>
                           </div>
                           <div className="col-md-12 text-center mb-3">
                              <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Create New Account</button>
                           </div>
                           <div className="col-md-12 ">
                              <div className="form-group">
                                 <p className="text-center"><Link to="/login" id="signin">Already have an account?</Link></p>
                              </div>
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


export default Signup; 