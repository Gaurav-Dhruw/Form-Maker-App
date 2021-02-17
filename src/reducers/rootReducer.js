import { combineReducers } from "redux";
import { queTypeUpdater } from "./queTypeUpdater";
import { queHandler } from "./queHandler";
import { formHandler } from "./formHandler";


const rootReducer = combineReducers({
    queTypeUpdater,
    queHandler,
    formHandler
});

export default rootReducer;