import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store";
import App from "./App";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>
);
