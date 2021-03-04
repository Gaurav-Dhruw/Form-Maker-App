

export const formHandler = (state = { formIDs: { 0: {formTitle:"Untitled",urlKey:'',genStatus:true,popupStatus:false,loadingStatus:false,
failureStatus:false,homePageStatus:true,homePageFailure:false}} }, action) => {

    switch (action.type) {
        case "addNewForm":

            return { ...state, formIDs: { ...state.formIDs, [action.formID]: {...state.formIDs[action.formID], ...action.data}} };

        case "removeForm":
            let formIdsObj = state.formIDs
            delete formIdsObj[action.data.formID]
            return { ...state, formIDs: { ...formIdsObj } };

        case "genConfirmation":
            return { ...state, formIDs: { ...state.formIDs, [action.formID]: {...state.formIDs[action.formID], ...action.data}} };

        default:
            return state;
    }

} 