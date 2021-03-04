import React, { Fragment } from "react";
import "../css/popupStyle.css";
import { formIdAction } from "../actions/action";
import {connect} from "react-redux";



class Formlink extends React.Component{
    constructor(props) {
        super(props)
    
       
    }


    render(){
        let status= this.props.formIDs[this.props.formID].popupStatus;
        let formlink= `https://form-maker-backend.herokuapp.com/${this.props.formIDs[this.props.formID].urlKey}`;
        
        return (<Fragment>
            { status?  
                
             <div className="popup-box">
              <div className="box">
                  <span className="close-icon" onClick={this.props.handlePopupDisplay}>x</span>
                  <p className="textCont">Send the generated form link:</p>
                  <p className="linkCont">{formlink}</p>
                 
                 
                </div>
              </div>:null
            }
            </Fragment>
        )
    }
    
}


const mapStatetoProps = (state) => {
    return {
      formIDs: state.formHandler.formIDs,
      
    
    }
  }
  

  
  export default connect(mapStatetoProps)(Formlink);

