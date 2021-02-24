import React from 'react';
import { Link } from 'react-router-dom';
import '../css/controlPanelStyle.css';


class ControlPanel extends React.Component {
    constructor(props) {
        super(props)
        this.changeStyle=this.changeStyle.bind(this);

    }

    changeStyle(event){
        console.log('event.target', event.target)

        if(event.target.id=="responseBtn"){
            document.getElementById(event.target.id).className="cntrlPanelBtns active";
            document.getElementById("formBtn").className="cntrlPanelBtns";
            document.getElementById("genformBtn").style.visibility="hidden";
        }

        else{
            document.getElementById(event.target.id).className="cntrlPanelBtns active";
            document.getElementById("responseBtn").className="cntrlPanelBtns ";
            document.getElementById("genformBtn").style.visibility="visible";

        }

    }

    render() {
        return (

            <div className="controlPanel">
                <div className="pairCont">
                <Link onClick={this.changeStyle} id="formBtn" className="cntrlPanelBtns active"to={this.props.formPath}>Form</Link>
                     <Link  id="responseBtn" onClick={this.changeStyle} className="cntrlPanelBtns" to={`${this.props.formPath}/response`}> Response</Link>
                </div>
                <span id="genformBtn" className="cntrlPanelBtns generateBtn">Generate Form</span>
            </div>
        )
    }

}


export default ControlPanel;