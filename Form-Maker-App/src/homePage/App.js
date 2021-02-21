import React, { Fragment } from "react";
import NewForm from "../formHandler/NewForm.js";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { formIdAction, queAction } from "../actions/action.js";
import { connect } from 'react-redux';
import Navbar from "./Navbar.js";
import "../css/homePageStyle.css";
import FormGeneration from "../generatedForm/FormGeneration";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.deleteForm = this.deleteForm.bind(this);
    this.handleFormPaths = this.handleFormPaths.bind(this);
  }

  handleFormPaths() {
    let formIdsObj = this.props.formIDs;
    let formIdsKey = Object.keys(formIdsObj);
    let newIDs = parseInt(formIdsKey[formIdsKey.length - 1]) + 1;
    console.log('newIDs', newIDs)

    // let newarray = this.props.formIDs;

    // newarray.push(newid);

    this.props.dispatchFormIDs({
      type: "addNewForm",
      payload: {
        formID: newIDs,
        formTitle: "Untitled"
      }
    });
    console.log("indise aap between two dispatch", newIDs)

    this.props.dispatchPreFormData({
      // queType: "",
      type: "preUpdate1",
      payload: {

        formID: newIDs - 1,
        questionNo: 0,
        data: { question: "Question", options: { 0: "Option" } }
      }
    })


  }


  deleteForm(event) {
    let formID = parseInt(event.target.id);

    this.props.dispatchFormIDs({
      type: "removeForm",
      payload: { formID }
    })

  }
  render() {
    console.log(this.props.formIDs, "inside render");
    let formIdsObj = this.props.formIDs;
    let formIdsKey = Object.keys(formIdsObj);

    let paths = "/newform" + `${formIdsKey[formIdsKey.length - 1]}`;
    console.log("paths", paths);
    // let formID = 0;
    let formList = formIdsKey.map((elm) => {

      return (
        <Route key={elm} path={`/newform${elm}`}>

          <div className="formMainCont" key={elm}>

            <NewForm formID={elm} formTitle={formIdsObj[elm]} formPath={`/newform${elm}`} />
          </div>
        </Route>
      );
    });

    let formLink = formIdsKey.map((elm) => {
      return (<Fragment>
        <div className="formLinkCont">



          <div class="dropdown">
            <button class="btn btn-secondary formLinkOption" type="button" data-bs-toggle="dropdown" aria-expanded="false">...

            </button>
            <ul class="dropdown-menu" id="deleteBtn" aria-labelledby="dropdownMenuButton1">
              <li><span class="dropdown-item" id={elm} onClick={this.deleteForm}>Delete Form</span></li>

            </ul>
          </div>

          <Link className="formLink" key={elm} to={`/newform${elm}`}>

            <span className="formLinkSpan">{formIdsObj[elm]}</span>
          </Link>
        </div>


      </Fragment>

      );
    });

    formLink = formLink.slice(0, formLink.length - 1);

    // console.log("formList", {formList});
    return (

      <Router>
        <Navbar />
        <div className="mainCont">
          <Switch>

            {formList}

            <Route path="/">
              <div className="formLinkCont createForm">

                <Link className="formLink" to={paths}>
                  <span onClick={this.handleFormPaths} className="plusIcon">New Form</span>
                </Link>
              </div>
              {formLink}
            </Route>

          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStatetoProps = (state) => {
  console.log('state', state)
  return {
    formIDs: state.formHandler.formIDs

  }
}
const mapDispatchtoProps = (dispatch) => {
  return {

    dispatchFormIDs: (para) => dispatch(formIdAction(para)),
    dispatchPreFormData: (para) => dispatch(queAction(para))

  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
