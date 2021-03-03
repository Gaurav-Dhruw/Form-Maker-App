import * as actions from "../actions/action.js";
let somearray, newarray, counter = 0;
export const queTypeUpdater = (
  state = {}, action) => {



  switch (action.type) {
    case actions.ADD_TXT:



      return { ...state, [action.formID]: { ...state[action.formID], [action.questionNo]: action.type } };
    case actions.ADD_CHECKBOX:



      return { ...state, [action.formID]: { ...state[action.formID], [action.questionNo]: action.type } };

    case actions.ADD_RADIO:



      return { ...state, [action.formID]: { ...state[action.formID], [action.questionNo]: action.type } };

    case "removeQue":

      let updatedQue = state[action.formID];
      delete updatedQue[action.questionNo]
      return { ...state, [action.formID]: { ...updatedQue } };

    // case "email":
    //   return { ...state, [action.formID]: { ...state[action.formID], [action.questionNo]: action.type } };

    // case "tel":
    //     return { ...state, [action.formID]: { ...state[action.formID], [action.questionNo]: action.type } };
  
    case "removeForm":
          let updatedState= state;
          delete updatedState[action.data.formID];
          return { ...updatedState};

    default:
      return state;
  }

}