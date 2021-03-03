import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import MultiTypeQue from "./MultiTypeQue";
import SingleTypeQue from "./SingleTypeQue";
import ParaTypeQue from "./ParaTypeQue";
import AdditionalTypeQue from "./AdditionalTypeQue.js";
// import "../js/jsForStyling"
import { queType, removeQue } from "../actions/action";


class QueTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.handleQueInversion = this.handleQueInversion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);




  }
  


  handleQueInversion(event) {
    let queNo = event.target.id;

    this.props.dispatchQueInversion({
      type: event.target.name,
      payload: {
        formID: this.props.formID,
        questionNo: queNo,

      }
    });
  }

  removeQuestion(event) {
    let queNo = event.target.id;



    this.props.dispatchRemoveQuestion({
      type: "removeQue",
      payload: {

        formID: this.props.formID,
        questionNo: queNo,

      }
    });

  }

  render() {
    let formKeys = Object.keys(this.props.queTypeUpdater);
    
    
    let que = formKeys.map((element, index) => {
      if (this.props.formID == parseInt(element)) {
        let queKeys = Object.keys(this.props.queTypeUpdater[element]);
        
        return queKeys.map((elm, ind) => {
          // let regex= new RegExp(this.props.queTypeUpdater[element][parseInt(elm)],"g")
          
          return (
            <div  id={`queCont${elm}`} className="queCont" key={ind}>
              <div className="dropdownQue">
                <button type="button" class="btn btn-secondary shadow-none" data-bs-toggle="dropdown" aria-expanded="false">
                  Change Type</button>

                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                  <li><a className="dropdown-item" name="text" value="text" id={parseInt(elm)} onClick={this.handleQueInversion}>Paragraph</a></li>

                  <li><a className="dropdown-item" name="radio" value="radio" id={parseInt(elm)} onClick={this.handleQueInversion}>Single Option</a></li>

                  <li><a className="dropdown-item" name="checkbox" value="checkbox" id={parseInt(elm)} onClick={this.handleQueInversion}>Multiple Option</a></li>
                  {/* <li><a className="dropdown-item" name="email" value="email" id={parseInt(elm)} onClick={this.handleQueInversion}>Email</a></li>
                  <li><a className="dropdown-item" name="tel" value="tel" id={parseInt(elm)} onClick={this.handleQueInversion}>Phone No.</a></li> */}

                </ul>
                <button id={parseInt(elm)} onClick={this.removeQuestion} class="btn btn-danger queCross shadow-none">
                &#x2715;
              </button>
              </div>
              {
                this.props.queTypeUpdater[element][parseInt(elm)] == "text" ? <ParaTypeQue formID={this.props.formID} queNo={parseInt(elm) } /> : null
              }

              {
                this.props.queTypeUpdater[element][parseInt(elm)] == "radio" ? <SingleTypeQue formID={this.props.formID} queNo={parseInt(elm)} /> : null
              }

              {
                this.props.queTypeUpdater[element][parseInt(elm)] == "checkbox" ? <MultiTypeQue formID={this.props.formID} queNo={parseInt(elm)} /> : null
              }
              {/* {
                regex.test("emailtel") ? <AdditionalTypeQue formID={this.props.formID} queNo={parseInt(elm)} Type={this.props.queTypeUpdater[element][parseInt(elm)]} /> : null
              } */}
              











            </div>
          )
        })
      }
    })



    return <div  className="allQueCont">{que}</div>;
  }




}

const mapStatetoProps = (state) => {
  return {
    queTypeUpdater: state.queTypeUpdater
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    dispatchQueInversion: (para) => dispatch(queType(para)),
    dispatchRemoveQuestion: (para) => dispatch(removeQue(para))
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(QueTemplate);
