import React,{Fragment} from 'react';
import { queAction } from "../actions/action.js";
import { connect } from "react-redux";

let question, counter = 0;

class AdditionlTypeQue extends React.Component{

    constructor(props) {
        super(props)
    
        this.handleInfo = this.handleInfo.bind(this);



    }
    // componentDidMount() {
    //     if (counter == 0) {

    //         this.props.dispatchQueInfo({
    //             type: "para",
    //             question: "Question",
    //             formID: this.props.formID,
    //             questionNo: this.props.queNo + 1

    //         });
    //     }

    // }

    handleInfo(event) {
        question = event.target.value;
        console.log('placeholder', question)
        let queInfo = {
            type: "para",
            payload: {
                data: { question },
                formID: this.props.formID,
                questionNo: this.props.queNo
            }

        }


        this.props.dispatchQueInfo(queInfo);

    }

    render() {
        let queData = this.props.queHandler[this.props.formID][this.props.queNo];

        return (<Fragment>
            {this.props.Type=="email"?<Fragment>
            <div className="addQueCont"> &nbsp;&nbsp;&nbsp;  email:<div className="addAnsCont">example@gmail.com</div></div>
            
            </Fragment>:null}
            {this.props.Type=="tel"?<Fragment>
            <div className="addQueCont">&nbsp;&nbsp;&nbsp;   phone no:<div className="addAnsCont" >9000800055</div></div>
            </Fragment>:null}
        </Fragment>)



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

export default connect(mapStatetoProps, mapDispatchtoProps)(AdditionlTypeQue);




            