
// 0: { 0: { question: "Question", noOfOps: 1 } }
export const queHandler = (state = {


}, action) => {
    console.log('state', action, state)



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
            console.log('action inside queHandler', action, state)


            return { ...state, [action.formID]: { ...state[action.formID], [action.questionNo]: { ...state[action.formID][action.questionNo], question: action.question, }, } };


        case "single":
            console.log('action inside queHandler', action, state)

            return {
                ...state,
                [action.formID]: { ...state[action.formID], [action.questionNo]: { ...state[action.formID][action.questionNo], question: action.question, options: { ...state[action.formID][action.questionNo].options, ...action.data.options } } }
            }
        case "multi":
            console.log('action inside queHandler', action, state)


            return {
                ...state,
                [action.formID]: { ...state[action.formID], [action.questionNo]: { ...state[action.formID][action.questionNo], question: action.question, options: { ...state[action.formID][action.questionNo].options, ...action.data.options } } }
            }

        case "removeQue":
            console.log('state,action', state, action)
            let updatedQue = state[action.formID];
            delete updatedQue[action.questionNo];
            return { ...state, [action.formID]: { ...updatedQue } };
        default:
            return state;
    }
}

// noOfOps: action.noOfOps, option0: action.option0 

