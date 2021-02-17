import React, { Fragment } from "react";
import QueTemplate from "./QueTemplate";
import QueType from "./QueType";
import { connect } from "react-redux";
import { formIdAction } from "../actions/action";
import "../css/queStyle.css"
import FormGeneration from "../generatedForm/FormGeneration";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.changeFormName = this.changeFormName.bind(this);

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

  render() {
    // console.log('NEwFORM', this.props.queDetails)


    return (<Fragment>
      <Router>
        <Switch>
          <Route path={`${this.props.formPath}/form`}>Opened<FormGeneration formID={this.props.formID}></FormGeneration></Route>



          <Route path={this.props.formpath}>
            <div className="formNameCont"><input id={this.props.formID} defaultValue={this.props.formTitle} onChange={this.changeFormName}></input></div>
            <hr></hr>

            <QueTemplate formID={this.props.formID}></QueTemplate>
            <QueType formID={this.props.formID} />
            <div><Link to={`${this.props.formPath}/form`}> Generate Form</Link></div>
          </Route>
        </Switch>
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

// const mapStatetoProps = (state) => {
//   return {
//     formIDs: state.formHandler
//   }
// }

const mapDispatchtoProps = (dispatch) => {
  return {
    dispatchFormTitle: (para) => dispatch(formIdAction(para))
  }
}

export default connect(null, mapDispatchtoProps)(NewForm);
