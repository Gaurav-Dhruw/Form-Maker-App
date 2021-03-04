


export const resLoadingHandler=(state={},action)=>{
    switch (action.type) {
        case "resLoadingChange":
            
            return{ ...state, [action.payload.formID]:{resLoadingStatus:action.payload.resLoadingStatus}}
    
        default:
           return state;
    }
  
}