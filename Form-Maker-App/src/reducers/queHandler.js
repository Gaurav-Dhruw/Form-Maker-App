
export const queHandler = (state = {0:{0:{question: "Question", options: { 0: "Option" }}}}


, action) => {



    switch (action.type) {
        case "preUpdate1":
            return {
                ...state,
                [action.formID]: {
                    [action.questionNo]: { ...action.data }
                }
            }

        case "preUpdate2":
            return {
                ...state,
                [action.formID]: { ...state[action.formID], [action.questionNo]: { ...state[action.formID][action.questionNo], ...action.data } }
            }
        case "para":


            return { ...state, [action.formID]: { ...state[action.formID], [action.questionNo]: { ...state[action.formID][action.questionNo], question: action.question, }, } };


        case "single":

            return {
                ...state,
                [action.formID]: { ...state[action.formID], [action.questionNo]: { ...state[action.formID][action.questionNo], question: action.question, options: { ...state[action.formID][action.questionNo].options, ...action.data.options } } }
            }
        case "multi":


            return {
                ...state,
                [action.formID]: { ...state[action.formID], [action.questionNo]: { ...state[action.formID][action.questionNo], question: action.question, options: { ...state[action.formID][action.questionNo].options, ...action.data.options } } }
            }

        case "removeQue":
            let updatedQue = state[action.formID];
            delete updatedQue[action.questionNo];
            return { ...state, [action.formID]: { ...updatedQue } };
        
        case "removeForm":
            let updatedState= state;
            delete updatedState[action.data.formID];
            return { ...updatedState};
        
       

        default:
            return state;
    }
}


