import React from "react";
import "../test.css";

import { queAction, queType } from "../actions/action";
import { connect } from "react-redux";

let selected;
class QueType extends React.Component {
  constructor(props) {
    super(props);

    this.getQueType = this.getQueType.bind(this);
  }
  getQueType(event) {

    console.log('this.props.formID', this.props.formID)
    selected = event.target.value;
    console.log(selected);

    let array = Object.keys(this.props.queHandler[this.props.formID]);
    array = array[array.length - 1];

    array = parseInt(array);

    let formQue = {
      type: selected,
      payload: {

        formID: this.props.formID,
        questionNo: array
      }
    }

    this.props.dispatchQueType(formQue);



    this.props.dispatchPreData({
      type: "preUpdate2",
      payload: {
        data: { question: "Question", options: { 0: "Option" } },
        formID: this.props.formID,
        questionNo: array + 1
      }
    })

  }
  render() {
    return (
      <div id="queTypeCont" className="queTypeCont">

        <button value="text" class="btn btn-primary" onClick={this.getQueType} > Paragraph</button>
        <button value="radio" class="btn btn-primary" onClick={this.getQueType}> Radio</button>
        <button value="checkbox" class="btn btn-primary" onClick={this.getQueType}> CheckBOx</button>

      </div>
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
    dispatchQueType: (para) => dispatch(queType(para)),
    dispatchPreData: (para) => dispatch(queAction(para))
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(QueType);
