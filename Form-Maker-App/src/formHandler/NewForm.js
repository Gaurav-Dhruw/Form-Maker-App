import React, { Fragment } from "react";
import QueTemplate from "./QueTemplate";
import QueType from "./QueType";
import ControlPanel from "./ControlPanel";
import { connect } from "react-redux";
import { formIdAction, queType } from "../actions/action";
import "../css/queStyle.css";
import axios from "axios";

import Response from "./Response";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.changeFormName = this.changeFormName.bind(this);
    this.sendFormDetails = this.sendFormDetails.bind(this);

  }
  changeFormName(event) {
    let newFormName = event.target.value;
    let formID = event.target.id;

    if (newFormName !== "") {

      this.props.dispatchFormTitle({
        type: "addNewForm",
        payload: { formID, formTitle: newFormName }
      });
    }


  }
  sendFormDetails() {
    let formID = this.props.formID
    axios.post("http://127.0.0.1:8000/form_api/formcreated/", {
      form_name: this.props.formIDs[formID]
    });

    let queTypeKeys = Object.keys(this.props.queType[formID]);
    let allQueDetails = this.props.queHandler[formID];

    queTypeKeys.forEach((element) => {

      let queInfo = allQueDetails[element];
      // if (this.props.queType[element] = "text") {

      axios.post("http://127.0.0.1:8000/form_api/questionlist/", {

        "question": queInfo.question,
        "question_type": "ANSWER",
        "title": this.props.formIDs[formID]
      })

      // }
      let emptyObj = {};


    })

  }



  render() {
    // console.log('NEwFORM', this.props.queDetails)


    return (<Fragment>
      <Router>
          <ControlPanel formPath={this.props.formPath}></ControlPanel>
        <Switch>
          {/* <Route path={`${this.props.formPath}/form`}>Opened<FormGeneration formID={this.props.formID}></FormGeneration></Route> */}

          <Route path={`${this.props.formPath}/response`}>
            <Response></Response>
          </Route>

          <Route path={this.props.formPath}>
            <div className="formNameCont"><input id={this.props.formID} defaultValue={this.props.formTitle} onChange={this.changeFormName}></input></div>


            <QueTemplate formID={this.props.formID}></QueTemplate>
            <QueType formID={this.props.formID} />

          </Route>



        </Switch>
          <div className="generateBtn" onClick={this.sendFormDetails}>Generate Form</div>
      </Router>
    </Fragment>


    );
  }
}

// const mapStatetoProps = (state) => {
//   return {
//     queDetails: state
//   }
// }

const mapStatetoProps = (state) => {
  return {
    formIDs: state.formHandler.formIDs,
    queType: state.queTypeUpdater,
    queHandler: state.queHandler
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    dispatchFormTitle: (para) => dispatch(formIdAction(para))
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(NewForm);
