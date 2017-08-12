import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import App from "./App";
import initChartJs from "./util/init-chartjs";
import "./index.css";

injectTapEventPlugin();
initChartJs();

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);

if (module.hot) {
  module.hot.accept("./App", () => {
    const { NextApp } = require("./App");
    ReactDOM.render(<NextApp />, rootElement);
  });
}
