import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { setup } from "twind";
import { twindConfig } from "./twind.config";

setup(twindConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
