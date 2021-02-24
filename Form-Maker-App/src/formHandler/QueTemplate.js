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

    // this.displayOptions= this.displayOptions.bind(this);



  }
  
//  displayOptions(event){
//      console.log('event.target', event.target.id)

//   // document.querySelector(`#${event.target.id} > .dropdownQue `).style.visibility="hidden";

//  }

  handleQueInversion(event) {
    let queNo = event.target.id;
    console.log('event.target.value', event.target.name)
    // ReactDOM.findDOMNode(event.target).className = "dropdown-item active";

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

    // let queObj = this.props.queHandler[this.props.formID][this.props.queNo].options;
    // // console.log('optionsObj', optionsObj)
    // let optionsKey = Object.keys(queObj);
    // delete queObj[queNo];

    this.props.dispatchRemoveQuestion({
      type: "removeQue",
      payload: {

        formID: this.props.formID,
        questionNo: queNo,

      }
    });

  }

  render() {
    // const { queDetails } = this.props;
    console.log('inside QT', this.props.queTypeUpdater)
    let formKeys = Object.keys(this.props.queTypeUpdater);
    console.log('formKeys', formKeys)
    
    
    let que = formKeys.map((element, index) => {
      console.log('object', (this.props.formID == parseInt(element)))
      if (this.props.formID == parseInt(element)) {
        let queKeys = Object.keys(this.props.queTypeUpdater[element]);
        console.log('INSIDE IF')
        
        return queKeys.map((elm, ind) => {
          let regex= new RegExp(this.props.queTypeUpdater[element][parseInt(elm)],"g")
          
          return (
            <div  id={`queCont${elm}`} className="queCont" key={ind}>
              <div className="dropdownQue">
                <button type="button" class="btn btn-secondary shadow-none" data-bs-toggle="dropdown" aria-expanded="false">
                  Change Type</button>

                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                  <li><a className="dropdown-item" name="text" value="text" id={parseInt(elm)} onClick={this.handleQueInversion}>Paragraph</a></li>

                  <li><a className="dropdown-item" name="radio" value="radio" id={parseInt(elm)} onClick={this.handleQueInversion}>Single Option</a></li>

                  <li><a className="dropdown-item" name="checkbox" value="checkbox" id={parseInt(elm)} onClick={this.handleQueInversion}>Multiple Option</a></li>
                  <li><a className="dropdown-item" name="email" value="email" id={parseInt(elm)} onClick={this.handleQueInversion}>Email</a></li>
                  <li><a className="dropdown-item" name="tel" value="tel" id={parseInt(elm)} onClick={this.handleQueInversion}>Phone No.</a></li>

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
              {
                regex.test("emailtel") ? <AdditionalTypeQue formID={this.props.formID} queNo={parseInt(elm)} Type={this.props.queTypeUpdater[element][parseInt(elm)]} /> : null
              }
              {/* 
              <select id={parseInt(elm)} onChange={this.handleQueInversion} >
                <option select >Change Question Type</option>
                <option name="text" value="text">Para</option>
                <option name="checkbox" value="checkbox"> CheckBOx</option>
                <option name="radio" value="radio">Radio</option>

              </select> */}











            </div>
          )
        })
      }
    })



    return <div  className="allQueCont">{que}</div>;
  }




}

const mapStatetoProps = (state) => {
  // console.log('Indise quetemplate', state)
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
