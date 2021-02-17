export const ADD_TXT = "text";
export const ADD_RADIO = "radio";
export const ADD_CHECKBOX = "checkbox";

export const queType = (formQue) => {
  console.log('queType action', formQue)
  return {
    type: formQue.type,
    formID: formQue.payload.formID,
    questionNo: formQue.payload.questionNo,
  };
};


export const queAction = (queInfo) => {
  console.log('queInfo', queInfo)
  return {
    type: queInfo.type,
    formID: queInfo.payload.formID,
    questionNo: queInfo.payload.questionNo,
    question: queInfo.payload.data.question,
    data: queInfo.payload.data

  };

}


export const formIdAction = (ID) => {
  console.log('ID', ID)
  return {
    type: ID.type,
    data: ID.payload
  }


}

export const removeQue = (remove) => {
  return {
    type: remove.type,
    questionNo: remove.payload.questionNo,
    formID: remove.payload.formID

  }
}


// export const filledForm = (filled) => {
//   type:

// }