import React from "react";
import "../css/navbarStyle.css";

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navBar">
                <span id="siteName">Form Control</span>
                <div className="navBarBtnCont">
                    <span className="navBarBtn">About</span>
                    
                </div>

            </nav>

        );
    }
}
