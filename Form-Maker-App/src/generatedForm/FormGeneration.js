import React, { Fragment } from "react";
import { connect } from "react-redux";


class FormGeneration extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let queInfoObj = this.props.queInfo[this.props.formID];

        let queTypeObj = this.props.queType[this.props.formID];
        let arrayType = [];

        let form = Object.keys(queTypeObj).map((queKey, index) => {



            // arrayType.push(queTypeObj[key]);
            if (queTypeObj[queKey] == "text") {
                // queInfoObj[queKey];
                return <Fragment><div className="queCont" >
                    <div>Q.{index + 1} {queInfoObj[queKey].question}</div>
                    <input></input>
                </div >

                </Fragment >


            }
            if (queTypeObj[queKey] == "radio" || queTypeObj[queKey] == "checkbox") {
                let optionsKey = Object.keys(queInfoObj[queKey].options);
                // optionsKey.pop();

                return (<Fragment><div className="queCont" >
                    <div>Q.{index + 1} {queInfoObj[queKey].question}</div>
                    <div>
                        {optionsKey.map((optionKey) => {
                            return (<div>
                                <input type={queTypeObj[queKey]} name={queKey} /> <span>{queInfoObj[queKey].options[optionKey]}</span>
                            </div>)

                        })}
                    </div>

                </div >

                </Fragment >);

            }



        })

        return (

            <form>
                Hello
                {form}
            </form>

        );
    }

}

const mapStatetoProps = (state) => {
    console.log('state', state)
    return {
        queType: state.queTypeUpdater,
        queInfo: state.queHandler
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {

        // dispatchFilledForm: (para) => dispatch(filledForm(para))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(FormGeneration);
