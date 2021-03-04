import { combineReducers } from "redux";
import { queTypeUpdater } from "./queTypeUpdater";
import { queHandler } from "./queHandler";
import { formHandler } from "./formHandler";
import {resQueUpdate} from "./resQueUpdate";
import {usersResponses}from './usersResponses';
import {formUserData} from "./formUserData"
import {resLoadingHandler} from "./resLoadingHandler"
import {reviewHandler} from "./reviewHandler"


const rootReducer = combineReducers({
    queTypeUpdater,
    queHandler,
    formHandler,
    resQueUpdate,
    usersResponses,
    formUserData,
    resLoadingHandler,
    reviewHandler
});

export default rootReducer;