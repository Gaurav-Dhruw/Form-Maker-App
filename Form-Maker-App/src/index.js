import React from "react";
import ReactDOM from "react-dom";

import App from "./homePage/App";
import { store, persistor } from "./store/storeManager.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>

      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
