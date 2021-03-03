

export const formUserData=(state={}, action)=>{

    switch (action.type){

        case "updateFormUserData":

           
            // payload:{
            //     form_id: user.form_id,
            //     user_id: user.submitted_user_id,
            //     userData:{email: user.email,
            // name_user: user.name_user,
            // phone_no: user.phone_no
            // }

            return{ ...state ,[action.payload.form_id]:{ ...state[action.payload.form_id],[action.payload.user_id]:{...action.payload.userData}}}
        default:
return state;
    
    
        }

    
}