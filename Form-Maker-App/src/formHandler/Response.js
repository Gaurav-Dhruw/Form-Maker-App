
import axios from "axios";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import "../css/responsePageStyle.css";
import { formUserUpdate, usersResponsed, resLoadingAction } from "../actions/action"






class Response extends React.Component {
    constructor(props) {
        super(props);

        this.state = { status: "Not Reviewed" };
        this.handleStatus = this.handleStatus.bind(this);

        this.props.dispatchResLoadingStatus({
            type: "resLoadingChange",

            payload: { formID: this.props.formIDs[this.props.formID].urlKey, resLoadingStatus: true }
        })


    }
    // componentDidMount(){
    //     document.getElementById("formBtn").className="cntrlPanelBtns";
    //         document.getElementById("responseBtn").className="cntrlPanelBtns active";
    //         document.getElementById("genformBtn").style.visibility="none";
    // }



    handleStatus() {
        this.setState({
            status: "Reviewed"
        })
    }
    componentWillUnmount() {
        document.getElementById("responseBtn").className = "cntrlPanelBtns link";
        document.getElementById("formBtn").className = "cntrlPanelBtns link active";
        console.log("UNMOUNTING")
        // this.props.dispatchResLoadingStatus({
        //     type:"resLoadingChange",

        //     payload:{formID: this.props.formIDs[this.props.formID].urlKey, resLoadingStatus:true}
        //   })


    }
    componentDidMount() {


        document.getElementById("responseBtn").className = "cntrlPanelBtns link active";
        document.getElementById("formBtn").className = "cntrlPanelBtns link";


        //     email: "dhruwgaurav01e@gmail.com"
        // form_id: "e5717934-339c-40de-bb4c-6241f126edd2"
        // name_user: "Test on progress"
        // phone_no: "6260904376"
        // submitted_user_id: "6a540145-c108-4a39-abdc-a658b88ad49b"

        axios.get(`https://form-maker-backend.herokuapp.com/form_submitted_api/submitteduserinfo/`).then(res => {
            console.log('res.data', res.data);
            let users = res.data;


            //             answer_given: "nothing re"
            // form_id: "e5717934-339c-40de-bb4c-6241f126edd2"
            // id: 2
            // options_answer_selected: null
            // question_id: "980e136a-bc71-4113-bdd0-b2bf526e54fa"
            // submitted_user_f_id: "Test on progress"

            axios.get(`https://form-maker-backend.herokuapp.com/form_submitted_api/submittedformresponse/`).then(res => {
                let responses = res.data;
                console.log('responses', responses)

                users.forEach(user => {
                    console.log('user', user)

                    if (this.props.formIDs[this.props.formID].urlKey === user.form_id) {




                        let resDetails = {};
                        responses.forEach(res => {
                            if (user.submitted_user_id === res.submitted_user_f_id) {
                                // console.log('user.submitted_user_id', user.submitted_user_id)


                                resDetails[res.question_id] = { answer_given: res.answer_given, options_answer_selected: res.options_answer_selected }



                            }

                        })

                        if (resDetails !== {}) {

                            this.props.dispatchUsersResponses({

                                type: "updateUsersResponse",
                                payload: {

                                    form_id: user.form_id,

                                    submitted_user_id: user.submitted_user_id,

                                    resDetails



                                }
                            })

                            console.table(resDetails)

                            this.props.dispatchFormUserData({
                                type: "updateFormUserData",

                                payload: {
                                    form_id: user.form_id,
                                    user_id: user.submitted_user_id,
                                    userData: {
                                        email: user.email,
                                        name_user: user.name_user,
                                        phone_no: user.phone_no
                                    }
                                }

                            })
                        }

                        console.log('resDetails', resDetails)















                    }







                })

                this.props.dispatchResLoadingStatus({
                    type: "resLoadingChange",

                    payload: { formID: this.props.formIDs[this.props.formID].urlKey, resLoadingStatus: false }
                })



            })




        })




    }


    render() {

        let resLoadingStatus = this.props.resLoadingHandler[this.props.formIDs[this.props.formID].urlKey].resLoadingStatus;


        if (resLoadingStatus === true) {

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



        else {


            if (this.props.formUserData[this.props.formIDs[this.props.formID].urlKey] === undefined) {
                return (<div className="responseMainCont">
                    <div className="resCountCont">
                        <div className="resCount">0 Responses</div>
                        <div className="resClosing">

                            <label class="form-check-label" for="flexSwitchCheckDefault">Close Form </label>
                            <div class="form-check form-switch toggleSwitch">

                                <input class="form-check-input shadow-none" type="checkbox" id="flexSwitchCheckDefault" />

                            </div>




                        </div>

                    </div>

                    {/* <hr></hr> */}







                </div>)
            }

            else {

                let currentFormQues = this.props.Questions[this.props.formIDs[this.props.formID].urlKey];
                let usersData = this.props.formUserData[this.props.formIDs[this.props.formID].urlKey];

                let currentFormResp = this.props.usersResponses[this.props.formIDs[this.props.formID].urlKey];

                console.log('usersData, currentFormQues, currentFormResp', usersData, currentFormQues, currentFormResp)

                let responses = Object.keys(usersData).map((singleUser, ind) => {

                    console.warn(typeof singleUser);
                    let targetId = singleUser;
                    console.log('targetId', targetId)
                    ind=`A${ind}`


                    return (

                        <div className="resBrief" key={singleUser}>
                            <div className="resNo">
                                <div class="btn btn-light shadow-none resName" type="button" data-bs-toggle="collapse" data-bs-target={`#${ind}`} aria-expanded="false" aria-controls={ind}>
                                    {usersData[singleUser].name_user}</div>
                                <div className="btn statusCont" onClick={this.handleStatus}>{this.state.status}</div>
                            </div>
                            <div class="collapse " id={ind}>
                                <div class="card card-body resQuesCont">

                                    <div className="resQueAnsCont">

                                        <div className="resQue">email: {usersData[singleUser].email}</div>
                                        <div className="resQue">Phone no: {usersData[singleUser].phone_no}</div>
                                    </div>


                                    {Object.keys(currentFormQues).map((que, index) => {


                                        return (<div className="resQueAnsCont" key={que}>



                                            <div className="resQue">{currentFormQues[que].question}</div>
                                            {currentFormQues[que].queType === "text" ?
                                                <div className="resAns">{currentFormResp[singleUser][que].answer_given}</div> : <Fragment>

                                                    {Object.keys(currentFormQues[que].options).map((op, index) => {

                                                        return (<Fragment>
                                                            {currentFormResp[singleUser][que].options_answer_selected.map(ans => {


                                                                return (<Fragment>
                                                                    {currentFormQues[que].options[op] === ans ? <div className="resAns" key={index}>{currentFormQues[que].options[op]} ANSWER</div> : <div className="resAns" key={index}>{currentFormQues[que].options[op]}</div>}
                                                                </Fragment>
                                                                )
                                                            })

                                                            } </Fragment>)

                                                    })}


                                                </Fragment>}

                                        </div>

                                        )

                                    })}

                                </div>
                            </div>
                        </div>
                    )
                })



                return (
                    <div className="responseMainCont">
                        <div className="resCountCont">
                            <div className="resCount">{Object.keys(usersData).length} Responses</div>
                            <div className="resClosing">

                                <label class="form-check-label" for="flexSwitchCheckDefault">Close Form </label>
                                <div class="form-check form-switch toggleSwitch">

                                    <input class="form-check-input shadow-none" type="checkbox" id="flexSwitchCheckDefault" />

                                </div>




                            </div>

                        </div>

                        {/* <hr></hr> */}


                        {responses}




                    </div>
                )
            }
        }
    }

}

const mapStatetoProps = (state) => {
    return {
        formIDs: state.formHandler.formIDs,
        Questions: state.resQueUpdate,
        usersResponses: state.usersResponses,
        formUserData: state.formUserData,
        resLoadingHandler: state.resLoadingHandler
        // users: state.
    }
}


const mapDispatchtoProps = (dispatch) => {
    return {
        dispatchUsersResponses: (para) => dispatch(usersResponsed(para)),
        dispatchFormUserData: (para) => dispatch(formUserUpdate(para)),
        dispatchResLoadingStatus: (para) => dispatch(resLoadingAction(para))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Response);