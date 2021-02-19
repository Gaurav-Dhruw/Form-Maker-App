

export const formHandler = (state = { formIDs: { 0: "Untitled" } }, action) => {

    switch (action.type) {
        case "addNewForm":

            return { ...state, formIDs: { ...state.formIDs, [action.data.formID]: action.data.formTitle } };

        case "removeForm":
            let formIdsObj = state.formIDs
            delete formIdsObj[action.data.formID]
            return { ...state, formIDs: { ...formIdsObj } };
        default:
            return state;
    }

} 