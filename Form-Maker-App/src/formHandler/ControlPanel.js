import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/controlPanelStyle.css';
import Confirmation from "./Confirmation";
import { formIdAction, resQueDetails } from "../actions/action";
import Formlink from './Formlink';
import axios from 'axios';



class ControlPanel extends React.Component {
    constructor(props) {
        super(props)
        this.handlePopupDisplay= this.handlePopupDisplay.bind(this);
        this.getQuestions= this.getQuestions.bind(this);
    }

    getQuestions(){

        axios.get(`https://form-maker-backend.herokuapp.com/form_creation_api/questionlist/`).then(res=>{
            console.log('res.data', res.data);
            console.log('res.data', res.data);

            console.log('res.data', res.data);

            let DBQuestions=res.data;
            console.log('DBQuestions', DBQuestions)

            axios.get(`https://form-maker-backend.herokuapp.com/form_creation_api/optionlist/`).
            then(res =>{
                console.log('res.data',res.data);
                let Options= res.data;
                console.log('DBQuestions', DBQuestions)
                DBQuestions.forEach(individualQue => {
                    console.log('INDISE  DBQuestions')
                    if( this.props.formIDs[this.props.formID].urlKey===individualQue.title){
                        console.log('INDISE  if',this.props.formIDs[this.props.formID].urlKey,individualQue.title)
                        if(individualQue.question_type==="text"){

                            this.props.dispatchResQueDetails({
                                type:"updateResQue",
                                payload:{
                                    formUrlKey: individualQue.title,
                                question: individualQue.question,
                                queUrlKey: individualQue.question_id,
                                queType: individualQue.question_type}
                            })

                            console.log('WEIRD', {
                                type:"updateResQue",
                                payload:{
                                    formUrlKey: individualQue.title,
                                question: individualQue.question,
                                queUrlKey: individualQue.question_id,
                                queType: individualQue.question_type}
                            })


                        }

                        else{
                            

                            
                            Options.forEach(individualOps=>{
                                if(individualQue.question_id===individualOps.question){
                                    delete individualOps.id;
                                    delete individualOps.question;
                                    
                                    let singleQueOptions={};
                                    for (const key in individualOps) {
    
                                       if(individualOps[key]===null){

                                       }
                                        else{

                                            singleQueOptions[key]=individualOps[key]
                                        } 
    
                                        
                                    }

                                    this.props.dispatchResQueDetails({
                                        type:'updateResOps',
                                        payload:{
                                            formUrlKey: individualQue.title,
                                        question: individualQue.question,
                                        queUrlKey: individualQue.question_id,
                                        queType: individualQue.question_type,
                                        options: singleQueOptions}
                                    })


                                    console.log('NICE', {
                                        type:'updateResOps',
                                        payload:{
                                            formUrlKey: individualQue.title,
                                        question: individualQue.question,
                                        queUrlKey: individualQue.question_id,
                                        queType: individualQue.question_type,
                                        options: singleQueOptions}
                                    })
                                       
                                }
                            })
                        }


                    }
    
                    
                });

           
            } )

      

      

           
        })
        

      
    }

    handlePopupDisplay(){

        if(this.props.formIDs[this.props.formID].popupStatus==false){
            
            this.props.dispatchGenStatus({
                type:'genConfirmation',
                formID:this.props.formID,
                payload:{popupStatus:true,loadingStatus:false,failureStatus:false}
            })
        }

        else{
            this.props.dispatchGenStatus({
                type:'genConfirmation',
                formID:this.props.formID,
                payload:{popupStatus:false,loadingStatus:false,failureStatus:false}
            })

        }
        
        
    }
    componentDidMount(){
        
    }
    
    

    render() {
        console.log('this.props.queInfo[this.props.formID]', this.props.queInfo[this.props.formID])

       
        return (<Fragment>

            <div className="controlPanel">
                <div className="pairCont">
                <Link  id="formBtn" className="cntrlPanelBtns link active"to={this.props.formPath}>Form</Link>
               
                {!this.props.formIDs[this.props.formID].genStatus?<Link  id="responseBtn"  className="cntrlPanelBtns link" to={`${this.props.formPath}/response`}>Response</Link>:null}
                </div>
                {this.props.formIDs[this.props.formID].genStatus?
                
                
                    <Fragment> {Object.keys(this.props.queInfo[this.props.formID]).length!==1?<span id="genformBtn" className="cntrlPanelBtns generateBtn genBtnActive" onClick={this.handlePopupDisplay}>Generate Form</span>:<span id="genformBtn" className="cntrlPanelBtns generateBtn disabled " >Generate Form</span>}</Fragment>:<span className="sendBtn" onClick={()=>{this.handlePopupDisplay();this.getQuestions()}}>Send<i class="material-icons sendIcon" >send</i></span>}

                </div>
            
            
            {this.props.formIDs[this.props.formID].genStatus?<Confirmation formID= {this.props.formID} handlePopupDisplay={()=>this.handlePopupDisplay()}></Confirmation>:<Formlink formID= {this.props.formID} handlePopupDisplay={()=>this.handlePopupDisplay()}></Formlink>
            
            }

            

            </Fragment>
        )
    }

}

const mapStatetoProps = (state) => {
    return {
      formIDs: state.formHandler.formIDs,
      queInfo: state.queHandler,
    }
  }
  
  const mapDispatchtoProps = (dispatch) => {
    return {
      dispatchGenStatus: (para) => dispatch(formIdAction(para)),
      dispatchResQueDetails:(para)=> dispatch(resQueDetails(para)) 
    
    }
  }




export default connect(mapStatetoProps,mapDispatchtoProps) (ControlPanel);