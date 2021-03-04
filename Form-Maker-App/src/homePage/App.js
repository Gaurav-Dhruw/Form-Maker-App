import React, { Fragment } from "react";
import NewForm from "../formHandler/NewForm.js";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { formIdAction, queAction, reviewStatusUpdate } from "../actions/action.js";
import { connect } from 'react-redux';
import axios from "axios";
import Navbar from "./Navbar.js";
import "../css/homePageStyle.css";
// import FormGeneration from "../generatedForm/FormGeneration";

let urlKey;


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



    // let formID = this.props.formID
    axios.post("https://form-maker-backend.herokuapp.com/form_creation_api/formcreated/", {
      form_name: this.props.formIDs[formIdsKey[formIdsKey.length - 1]].formTitle
    }).then(res => {
      console.log('res.status', res.data)


      console.warn("FORM CREATED IN DB")
      urlKey = res.data.url_key;
      
      this.props.dispatchFormIDs({
        type: "addNewForm",
        formID: newIDs - 1,
        payload: {


          urlKey,
        }
      });

      this.props.dispatchGenStatus({
        type: 'genConfirmation',
        formID: newIDs - 1,
        payload: { homePageStatus: false,          formStatus:res.data.form_status
        }

      })

      this.props.dispatchReviewStatus({
        type:"addFormUrlKey",
        payload:{
          formUrlKey:urlKey,
          
        }
      })

    }).catch(err=>{

      console.error("FORM CREATION FAILED IN DB")

      this.props.dispatchGenStatus({
        type: 'genConfirmation',
        formID: newIDs - 1,
        payload: { homePageStatus: true,homePageFailure:true }

      })

      


    });


    this.props.dispatchFormIDs({
      type: "addNewForm",
      formID: newIDs,
      payload: {

        formTitle: "Untitled" + `${newIDs}`,
        genStatus: true,
        popupStatus: false,
        urlKey: "",
        loadingStatus: false,
        failureStatus: false,
        homePageStatus:true,
        homePageFailure:false,
      }
    });







    this.props.dispatchPreFormData({
      // queType: "",
      type: "preUpdate1",
      payload: {

        formID: newIDs,
        questionNo: 0,
        data: { question: "Question", options: { 0: "Option" } }
      }
    });


  }


  deleteForm(event) {
    let formID = parseInt(event.target.id);

    axios.delete(`https://form-maker-backend.herokuapp.com/form_creation_api/formcreated/${this.props.formIDs[formID].urlKey}`).then(res => {
      console.log('res.status', res)

    });

    this.props.dispatchFormIDs({
      type: "removeForm",
      payload: { formID }
    });



  }
  render() {
    let formIdsObj = this.props.formIDs;
    let formIdsKey = Object.keys(formIdsObj);

    let paths = "/App/newform" + `${formIdsKey[formIdsKey.length - 1]}`;
    let formList = formIdsKey.map((elm) => {

      return (
        <Route key={elm} path={`/App/newform${elm}`}>

          <div className="formMainCont" key={elm}>

            <NewForm formID={elm} formPath={`/App/newform${elm}`} />
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

          <Link className="formLink" key={elm} to={`/App/newform${elm}`}>

            <span className="formLinkSpan">{formIdsObj[elm].formTitle}</span>
          </Link>
        </div>


      </Fragment>

      );
    });

    formLink = formLink.slice(0, formLink.length - 1);

    return (

      <Router>
        {/* <Navbar /> */}
        <div className="mainCont">
          <Switch>

            {formList}

            <Route path="/App">
              <div className="allFormLinkCont">
                <div className="formLinkCont createForm">

                  <Link className="formLink" to={paths}>
                    <span onClick={this.handleFormPaths} className="plusIcon">New Form</span>
                  </Link>
                </div>
                {formLink}
              </div>
            </Route>

          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    formIDs: state.formHandler.formIDs

  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
    dispatchGenStatus: (para) => dispatch(formIdAction(para)),
    dispatchReviewStatus:(para)=>dispatch(reviewStatusUpdate(para)),
    dispatchFormIDs: (para) => dispatch(formIdAction(para)),
    dispatchPreFormData: (para) => dispatch(queAction(para))

  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
