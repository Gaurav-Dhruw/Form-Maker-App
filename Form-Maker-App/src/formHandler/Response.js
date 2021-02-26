
import React from "react";
import "../css/responsePageStyle.css";



class Response extends React.Component {
    constructor(props) {
        super(props);

        this.state = { status: "Not Reviewed" };
        this.handleStatus = this.handleStatus.bind(this);


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

    render() {

        return (
            <div className="responseMainCont">
                <div className="resCountCont">
                    <div className="resCount">23 Responses</div>
                    <div className="resClosing">

                    <label class="form-check-label" for="flexSwitchCheckDefault">Close Form </label>
                        <div class="form-check form-switch toggleSwitch">
                            
                            <input class="form-check-input shadow-none" type="checkbox" id="flexSwitchCheckDefault"/>
                            
                        </div>



                    </div>
                        
                </div>

                    {/* <hr></hr> */}
                    <div className="resBrief">
                        <div className="resNo">
                            <div class="btn btn-light shadow-none resName" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                Button with data-bs-target</div>
                            <div className="btn statusCont" onClick={this.handleStatus}>{this.state.status}</div>
                        </div>
                        <div class="collapse " id="collapseExample">
                            <div class="card card-body resQuesCont">
                                <div className="resQueAnsCont">

                                    <div className="resQue">Questions will be here. What if the text is somewhat longer than expected</div>
                                    <div className="resAns">options or answer will ber here</div>
                                    <div className="resAns">options or answer will ber hereWhat if the text is somewhat longer than expected</div>
                                    <div className="resAns">options or answer will ber here</div>
                                </div>
                                <div className="resQueAnsCont">
                                    <div className="resQue">Questions will be here</div>
                                    <div className="resAns">options or answer will ber here</div>
                                </div>
                                <div className="resQueAnsCont">
                                    <div className="resQue">Questions will be here</div>
                                    <div className="resAns">options or answer will ber here</div>
                                </div>
                            </div>
                            {/* <div class="card card-body resQuesCont">
                        
                        
                    </div> */}

                        </div>
                    </div>

                    <div className="resBrief">
                        <div className="resNo">
                            <div class="btn btn-light shadow-none resName" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                Button with data-bs-target</div>
                            <div className="btn statusCont" onClick={this.handleStatus}>stauts: {this.state.status}</div>
                        </div>
                        <div class="collapse " id="collapseExample">
                            <div class="card card-body resQuesCont">
                                <div className="resQueAnsCont">

                                    <div className="resQue">Questions will be here. What if the text is somewhat longer than expected</div>
                                    <div className="resAns">options or answer will ber here</div>
                                    <div className="resAns">options or answer will ber hereWhat if the text is somewhat longer than expected</div>
                                    <div className="resAns">options or answer will ber here</div>
                                </div>
                                <div className="resQueAnsCont">
                                    <div className="resQue">Questions will be here</div>
                                    <div className="resAns">options or answer will ber here</div>
                                </div>
                                <div className="resQueAnsCont">
                                    <div className="resQue">Questions will be here</div>
                                    <div className="resAns">options or answer will ber here</div>
                                </div>
                            </div>
                            {/* <div class="card card-body resQuesCont">
                        
                        
                    </div> */}

                        </div>
                    </div>


                
            </div>
        )
    }

}

export default Response;