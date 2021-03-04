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
                  <h2 className="aboutHeading">About</h2>
                  <div className="aboutText">A genuine place to create high quality forms with full functionality of what one could need. It is here where you get full customization according to the demands. User can create forms with variety of different options - text, radio, checkbox. The creator of the form gets to see the submission as it happens. One can also close the submission for the form if thats what one wants</div>
                 
                </div></div>:null}

            </nav>

        );
    }
}
