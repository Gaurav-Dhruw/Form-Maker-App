

export const usersResponses=(state={},action)=>{
    switch(action.type){

        case "updateUsersResponse":
        console.log('state,action', state,action)

            // type: "updateUsersResponse",
            // payload: {
            //     email: user.email,
            //     form_id: user.form_id,
            //     name_user: user.name_user,
            //     phone_no: user.phone_no,
            //     submitted_user_id: user.submitted_user_id,           
            //      answer_given: res.answer_given,
               
              
            //     options_answer_selected: res.options_answer_selected,
            //     question_id: res.question_id
               

            // }

        return{...state,[action.payload.form_id]:{...state[action.payload.form_id],[action.payload.submitted_user_id]:{...action.payload.resDetails}}}

        default:
            return state;
    }
}