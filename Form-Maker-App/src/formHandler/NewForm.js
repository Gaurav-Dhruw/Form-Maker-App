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


let urlKey;
class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.changeFormName = this.changeFormName.bind(this);
    this.retryFormCreation= this.retryFormCreation.bind(this);


  }
  componentWillUnmount(){
    if(this.props.formIDs[this.props.formID].homePageFailure == true){

      this.props.dispatchFormIDs({
        type: "removeForm",
        payload: {formID: this.props.formID }
      });
    }
  }


  changeFormName(event) {
    let newFormName = event.target.value;
    let formID = event.target.id;

    if (newFormName !== "") {

      this.props.dispatchFormTitle({
        type: "addNewForm",
        formID,
        payload: { formTitle: newFormName }
      });
    }


  }

  retryFormCreation(){

    // let formIdsObj = this.props.formIDs;
    // let formIdsKey = Object.keys(formIdsObj);
    // let newIDs = parseInt(formIdsKey[formIdsKey.length - 1]) + 1;

    this.props.dispatchGenStatus({
      type: 'genConfirmation',
      formID:this.props.formID,
      payload: { homePageStatus: true,homePageFailure:false }

    })



    // let formID = this.props.formID
    axios.post("https://form-maker-backend.herokuapp.com/form_creation_api/formcreated/", {
      form_name: this.props.formIDs[this.props.formID].formTitle
    }).then(res => {
      console.log('res.status', res)

      console.warn("FORM CREATED IN DB")
      urlKey = res.data.url_key;
      this.props.dispatchFormIDs({
        type: "addNewForm",
        formID: this.props.formID,
        payload: {


          urlKey
        }
      });

      this.props.dispatchGenStatus({
        type: 'genConfirmation',
        formID: this.props.formID,
        payload: { homePageStatus: false }

      })

    }).catch(err=>{

      console.error("FORM CREATION FAILED IN DB")

      this.props.dispatchGenStatus({
        type: 'genConfirmation',
        formID:this.props.formID,
        payload: { homePageStatus: true,homePageFailure:true }

      })

      


    });


 






   



  }

  





  render() {


    let formIDs = this.props.formIDs;
    let formTitle = formIDs[this.props.formID].formTitle;

    if (this.props.formIDs[this.props.formID].homePageStatus == true) {
      if (this.props.formIDs[this.props.formID].homePageFailure == true) {

        return (
          <Fragment>
            <div class="resLoadingCont">
              <button type="button" class="btn btn-default" aria-label="Left Align" onClick={this.retryFormCreation}>
                <span class="glyphicon glyphicon-repeat" aria-hidden="true">Try Again</span>
              </button>

            </div>


          </Fragment>
        )


      }

      else {


        return (
          <Fragment>
            <div class="resLoadingCont">
              <div class="spinner-border text-primary spinner" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>

            </div>


          </Fragment>
        )
      }

    }

    else {


      return (<Fragment>
        <Router>
          <ControlPanel formPath={this.props.formPath} formID={this.props.formID}></ControlPanel>

          <Switch>
            {/* <Route path={`${this.props.formPath}/form`}>Opened<FormGeneration formID={this.props.formID}></FormGeneration></Route> */}

            <Route path={`${this.props.formPath}/response`}>
              <Response formID={this.props.formID}></Response>
            </Route>

            <Route path={this.props.formPath}>
              <div className="formNameCont"><input id={this.props.formID} defaultValue={formTitle} onChange={this.changeFormName}></input></div>


              <QueTemplate formID={this.props.formID}></QueTemplate>
              <QueType formID={this.props.formID} />

            </Route>



          </Switch>

          {/* <div className="generateBtn" onClick={this.sendFormDetails}>Generate Form</div> */}
        </Router>
      </Fragment>


      );
    }
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
    queHandler: state.queHandler,

  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    dispatchGenStatus: (para) => dispatch(formIdAction(para)),
    dispatchFormIDs: (para) => dispatch(formIdAction(para)),

    dispatchFormTitle: (para) => dispatch(formIdAction(para))
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(NewForm);
