import React, { Fragment } from "react";
import "../css/popupStyle.css";
import { formIdAction, resLoadingAction } from "../actions/action";
import { connect } from "react-redux";
import axios from "axios";


class Confirmation extends React.Component {
  constructor(props) {
    super(props)

    this.sendFormDetails = this.sendFormDetails.bind(this);
    this.handleGeneration = this.handleGeneration.bind(this)
  }
  sendFormDetails() {
    let formID = this.props.formID


    axios.put(`https://form-maker-backend.herokuapp.com/form_creation_api/formcreated/${this.props.formIDs[formID].urlKey}/`, {
      form_name: this.props.formIDs[formID].formTitle,

    }).then();






    let queTypeKeys = Object.keys(this.props.queType[formID]);
    let allQueDetails = this.props.queHandler[formID];

    queTypeKeys.forEach((element) => {

      let queInfo = allQueDetails[element];

      if (this.props.queType[formID][element] === "text") {



        axios.post(`https://form-maker-backend.herokuapp.com/form_creation_api/questionlist/`, {
          question: queInfo.question,
          question_type: this.props.queType[formID][element],
          title: this.props.formIDs[formID].urlKey
        }).then(res => {


          this.props.dispatchResLoadingStatus({
            type: "resLoadingChange",

            payload: { formID: this.props.formIDs[this.props.formID].urlKey, resLoadingStatus: true }
          })


          this.props.dispatchGenStatus({
            type: 'genConfirmation',
            formID: this.props.formID,
            payload: { genStatus: false, popupStatus: false }
          })

        }).catch(err => {
          this.props.dispatchGenStatus({
            type: 'genConfirmation',
            formID: this.props.formID,
            payload: { failureStatus: true, loadingStatus: false }

          })

        });



      }
      else {




        axios.post(`https://form-maker-backend.herokuapp.com/form_creation_api/questionlist/`, {
          question: queInfo.question,
          question_type: this.props.queType[formID][element],
          title: this.props.formIDs[formID].urlKey
        })

          .then(res => {


            let opsObj = queInfo.options;
            let opsKey = Object.keys(opsObj);
            let queFullInfo = {};
            queFullInfo.question = res.data.question_id;
            opsKey.forEach((ops, ind) => {
              queFullInfo[`option${ind + 1}`] = opsObj[ops];
            })



            axios.post(`https://form-maker-backend.herokuapp.com/form_creation_api/optionlist/`, queFullInfo

            ).then(res => {


              this.props.dispatchResLoadingStatus({
                type: "resLoadingChange",

                payload: { formID: this.props.formIDs[this.props.formID].urlKey, resLoadingStatus: true }
              })



              this.props.dispatchGenStatus({
                type: 'genConfirmation',
                formID: this.props.formID,
                payload: { genStatus: false, popupStatus: false }
              })

            }).catch(err => {

              this.props.dispatchGenStatus({
                type: 'genConfirmation',
                formID: this.props.formID,
                payload: { failureStatus: true, loadingStatus: false }

              })

            })





          }).catch(err => {

            this.props.dispatchGenStatus({
              type: 'genConfirmation',
              formID: this.props.formID,
              payload: { failureStatus: true, loadingStatus: false }

            })

          })

      }

    })

  }


  handleGeneration() {
    this.props.dispatchGenStatus({
      type: 'genConfirmation',
      formID: this.props.formID,
      payload: { loadingStatus: true }
    })
  }

  render() {
    let status = this.props.formIDs[this.props.formID].popupStatus;
    let loadingStatus = this.props.formIDs[this.props.formID].loadingStatus;
    let failureStatus = this.props.formIDs[this.props.formID].failureStatus;

    return (<Fragment>
      { status ?

        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={this.props.handlePopupDisplay}>x</span>
            <p className="textCont">Once you generate the form, it cannot be edited later.</p>
            <div className="confGenBtnCont">

              {loadingStatus ? <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div> : <Fragment>{failureStatus ? <span class="cntrlPanelBtns generateBtn genBtnActive" onClick={() => { this.handleGeneration(); this.sendFormDetails() }}>Try Again</span> : <span class="cntrlPanelBtns generateBtn genBtnActive" onClick={() => { this.handleGeneration(); this.sendFormDetails() }}>Confirm</span>}</Fragment>}
            </div>
          </div>
        </div> : null
      }

    </Fragment>




    );
  }
}

const mapStatetoProps = (state) => {
  return {
    formIDs: state.formHandler.formIDs,

    queType: state.queTypeUpdater,
    queHandler: state.queHandler
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    dispatchGenStatus: (para) => dispatch(formIdAction(para)),
    dispatchFormTitle: (para) => dispatch(formIdAction(para)),
    dispatchResLoadingStatus: (para) => dispatch(resLoadingAction(para))


  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Confirmation);



