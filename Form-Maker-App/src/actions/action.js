export const ADD_TXT = "text";
export const ADD_RADIO = "radio";
export const ADD_CHECKBOX = "checkbox";

export const queType = (formQue) => {
  return {
    type: formQue.type,
    formID: formQue.payload.formID,
    questionNo: formQue.payload.questionNo,
  };
};


export const queAction = (queInfo) => {
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
    formID:ID.formID,
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


export const resQueDetails = (data) => {
  console.log('data', data)
  return {
     type:data.type,
  payload:data.payload

  }

}

export const usersResponsed=(userRes)=>{
  console.log('userRes', userRes)

  return{
    type:userRes.type,
    payload: userRes.payload
  
  }

}


export const formUserUpdate=(material)=>{

  console.log('material', material)
  return{
    type:material.type,
    payload:material.payload
}
}


export const resLoadingAction=(data)=>{
  return{
    type:data.type,
   
    payload:data.payload
  }
}