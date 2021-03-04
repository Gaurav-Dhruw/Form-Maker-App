import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from '../reducers/rootReducer.js';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["queTypeUpdater", "queHandler", "formHandler","resQueUpdate","usersResponses","formUserData","resLoadingHandler","reviewHandler"]
};

let pReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(pReducer);
let persistor = persistStore(store);
export { store, persistor };