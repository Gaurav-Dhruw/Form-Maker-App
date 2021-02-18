import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { queAction } from "../actions/action.js";



let question = "Question", opId, options, noOfOps = 1;
class SingleTypeQue extends React.Component {
    constructor(props) {
        super(props)
        this.handleQueInfo = this.handleQueInfo.bind(this);
        this.handleOptionInfo = this.handleOptionInfo.bind(this);
        this.removeOption = this.removeOption.bind(this);
        this.addOption = this.addOption.bind(this);
    }

    handleQueInfo(event) {

        question = event.target.value;
        console.log('placeholder', question)




        let queInfo = {
            type: "single",

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



        optionsObj[event.target.id] = event.target.value;


        let optionInfo = {
            type: "single",

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
        console.log('optionsObj', optionsObj)
        let optionsKey = Object.keys(optionsObj);
        optionsKey = parseInt(optionsKey[optionsKey.length - 1])
        console.log('optionsKey', optionsKey)





        let optionInfo = {
            type: "single",

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
        console.log('optionsObj', optionsObj)
        let optionsKey = Object.keys(optionsObj);

        if (optionsKey.length !== 1) {

            delete optionsObj[event.target.id];

            let optionInfo = {
                type: "single",

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
        console.log('optionsObj', optionsObj)
        let optionsKey = Object.keys(optionsObj);
        console.log('optionsKey', optionsKey)


        options = optionsKey.map((data, index) => {
            return <Fragment>


                <div class="form-check optionsCont" key={data} id={data}>
                    <input class="form-check-input optionsIcon" type="radio" name="flexRadioDefault" />

                    <input type="text" className="optionInput" defaultValue={optionsObj[data]} id={data} onBlur={this.handleOptionInfo}></input> <button onClick={this.removeOption} id={data} class="btn btn-outline-warning">X</button>

                </div>


                {/* <input type="radio" name="option" ></input> */}

            </Fragment>


        })
        let queData = this.props.queHandler[this.props.formID][this.props.queNo];

        console.log('queData', queData)
        return (<Fragment>
            <div>Q. <input type="text" className="queInput" name='question' onBlur={this.handleQueInfo} defaultValue={queData.question}></input>
            </div>


            {options}
            <button onClick={this.addOption} class="btn btn-primary addOption">add option</button>
        </Fragment>

        );
    }

}

const mapStatetoProps = (state) => {
    console.log("state inside ParaTYpeQes", state)
    return {
        queHandler: state.queHandler
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {

        dispatchQueInfo: (para) => dispatch(queAction(para))

    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(SingleTypeQue);