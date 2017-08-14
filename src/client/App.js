import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { BrowserRouter, Route } from "react-router-dom";
import getTheme from "./util/get-theme";
import HomePage from "./containers/HomePage";
import ComparePage from "./containers/ComparePage";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider muiTheme={getTheme()}>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/compare" component={ComparePage} />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}
