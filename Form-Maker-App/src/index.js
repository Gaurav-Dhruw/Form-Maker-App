import React from "react";
import ReactDOM from "react-dom";

import Home from "./homePage/Home";
import { store, persistor } from "./store/storeManager.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>

      <Home />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
