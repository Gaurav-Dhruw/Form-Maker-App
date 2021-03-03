import React from "react";
import "../css/navbarStyle.css";
import {Link} from "react-router-dom";
import "../css/popupStyle.css";

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state={aboutStatus:false}
        this.handleAbout= this.handleAbout.bind(this)
    }


    handleAbout(){
       {this.state.aboutStatus ?this.setState({aboutStatus:false}): this.setState({aboutStatus:true})}
    }

    render() {
        return (
            <nav className="navBar">
                <span id="siteName"><Link to="/">Form Control</Link></span>
                <div className="navBarBtnCont">
                    <span className="navBarBtn" onClick={this.handleAbout}>About</span>
                    
                </div>

                {this.state.aboutStatus? <div className="popup-box">
              <div className="box">
                  <span className="close-icon" onClick={this.handleAbout}>x</span>
                  <h3>hello about us</h3>
                 
                </div></div>:null}

            </nav>

        );
    }
}
