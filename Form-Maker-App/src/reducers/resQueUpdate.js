


export const resQueUpdate=(state={},action)=>{
    console.log('state', state, action)

    switch (action.type){
        case "updateResQue":
            return {...state, [action.payload.formUrlKey]:{...state[action.payload.formUrlKey], [action.payload.queUrlKey]:{queType:action.payload.queType,question:action.payload.question}}
         }

        case "updateResOps":
            console.log('state, action', state, action)
            return {...state, [action.payload.formUrlKey]:{...state[action.payload.formUrlKey], [action.payload.queUrlKey]:{queType:action.payload.queType,question:action.payload.question, options:{...action.payload.options}}}}
        
        default:
            return state;
    }

}