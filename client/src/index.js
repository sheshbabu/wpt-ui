import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import App from "./App";
import initChartJs from "./util/init-chartjs";
import "./index.css";

injectTapEventPlugin();
initChartJs();

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(<NextApp />, document.getElementById("root"));
  });
}
