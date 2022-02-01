import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import "./components/layout/Theme.css";
import detectElectron from "./helpers/detectElectron";

const isElectronClient = detectElectron();

var ClientRouter = BrowserRouter;

if(isElectronClient) {
  ClientRouter = HashRouter;
}

ReactDOM.render(
  <Provider store={store}>
    <ClientRouter>
      <App />
    </ClientRouter>
  </Provider>,
  document.getElementById("root")
);
