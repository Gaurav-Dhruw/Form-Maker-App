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
                <span className="navBarBtnCont">
                    <span className="navBarBtn">About</span>
                    <span className="navBarBtn">Contact Us</span>
                </span>

            </nav>

        );
    }
}
