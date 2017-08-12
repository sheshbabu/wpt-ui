// Client index.js
// Named so because of CreateReactApp requirements

const React = require("react");
const ReactDOM = require("react-dom");
const injectTapEventPlugin = require("react-tap-event-plugin");
const { App } = require("./client/App");
const { initChartJs } = require("./client//util/init-chartjs");
require("./client/index.css");

injectTapEventPlugin();
initChartJs();

const rootElement = document.getElementById("root");

ReactDOM.render(React.createElement(App), rootElement);

if (module.hot) {
  module.hot.accept("./client/App", () => {
    const { NextApp } = require("./client/App");
    ReactDOM.render(React.createElement(NextApp), rootElement);
  });
}
