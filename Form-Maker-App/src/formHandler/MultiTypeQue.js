import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { queAction } from "../actions/action.js";

let  opId, options, noOfOps = 1;
class MultiTypeQue extends React.Component {
    constructor(props) {
        super(props)
        this.handleQueInfo = this.handleQueInfo.bind(this);
        this.handleOptionInfo = this.handleOptionInfo.bind(this);
        this.removeOption = this.removeOption.bind(this);
        this.addOption = this.addOption.bind(this);
    }

    handleQueInfo(event) {

        let question = event.target.value;
     




        let queInfo = {
            type: "multi",

            payload: {
                data: {

                    options: this.props.queHandler[this.props.formID][this.props.queNo].options,

                    question,
                },

                formID: this.props.formID,
                questionNo: this.props.queNo,


            }

        }
        this.props.dispatchQueInfo(queInfo);




    }

    handleOptionInfo(event) {
        let optionsObj = this.props.queHandler[this.props.formID][this.props.queNo].options;
        let optionsKey = Object.keys(optionsObj);
        let question= this.props.queHandler[this.props.formID][this.props.queNo].question;




        optionsObj[event.target.id] = event.target.value;


        let optionInfo = {
            type: "multi",

            payload: {
                data: {

                    options: optionsObj,

                    question,
                },

                formID: this.props.formID,
                questionNo: this.props.queNo,


            }


        }
        this.props.dispatchQueInfo(optionInfo);
    }

    addOption() {
        let optionsObj = this.props.queHandler[this.props.formID][this.props.queNo].options;
        let question = this.props.queHandler[this.props.formID][this.props.queNo].question;

    
        let optionsKey = Object.keys(optionsObj);
        optionsKey = parseInt(optionsKey[optionsKey.length - 1])
      





        let optionInfo = {
            type: "multi",

            payload: {
                data: {

                    options: { [optionsKey + 1]: "Option" },

                    question,
                },

                formID: this.props.formID,
                questionNo: this.props.queNo,


            }


        }
        this.props.dispatchQueInfo(optionInfo);

    }

    removeOption(event) {
        let optionsObj = this.props.queHandler[this.props.formID][this.props.queNo].options;
        let question = this.props.queHandler[this.props.formID][this.props.queNo].question;

        let optionsKey = Object.keys(optionsObj);

        if (optionsKey.length !== 1) {

            delete optionsObj[event.target.id];

            let optionInfo = {
                type: "multi",

                payload: {
                    data: {

                        options: optionsObj,

                        question,
                    },

                    formID: this.props.formID,
                    questionNo: this.props.queNo,


                }


            }
            this.props.dispatchQueInfo(optionInfo);
        }




    }
    render() {

        // noOfOps = this.props.queHandler[this.props.formID][this.props.queNo].noOfOps
        let optionsObj = this.props.queHandler[this.props.formID][this.props.queNo].options;
        let optionsKey = Object.keys(optionsObj);


        options = optionsKey.map((data, index) => {
            return <Fragment>
                <div key={data} id={data} class="form-check optionsCont">
                    <input class="form-check-input optionsIcon" type="checkbox" value="" />
                    <input type="text" defaultValue={optionsObj[data]} id={data} onChange={this.handleOptionInfo} className="optionInput"></input><button onClick={this.removeOption} id={data} class="btn shadow-none optionCancelBtn">&#x2715;</button>

                    {/* <input type="checkbox" name="option" ></input> */}
                </div>

            </Fragment>


        })
        let queData = this.props.queHandler[this.props.formID][this.props.queNo];

        return (<Fragment>
            <div className="questionCont">Q. <input type="text" className="queInput" name='question' onChange={this.handleQueInfo} defaultValue={queData.question}></input>
            </div>


            {options}
            <button onClick={this.addOption} class="btn btn-primary shadow-none addOption">Add Option</button>
        </Fragment>

        );
    }

}

const mapStatetoProps = (state) => {
    return {
        queHandler: state.queHandler
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {

        dispatchQueInfo: (para) => dispatch(queAction(para))

    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(MultiTypeQue);