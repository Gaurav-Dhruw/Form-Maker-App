
export const reviewHandler = (state={}, action) => {

    switch (action.type) {
        case "addFormUrlKey":
            return{...state,[action.payload.formUrlKey]:{}}
        case "addReviewStatus":
            console.log("action,state", action,state)
            return{...state,[action.payload.formUrlKey]:{...state[action.payload.formUrlKey],[action.payload.userID]:{reviewStatus:action.payload.reviewStatus}}}
            
        case "updateReviewStatus":
            return { ...state, [action.payload.formUrlKey]: { ...state[action.payload.formUrlKey], [action.payload.userID]: { ...state[action.payload.formUrlKey][action.payload.userID], reviewStatus: action.payload.reviewStatus } } }
        default:
            return state;
    }
}