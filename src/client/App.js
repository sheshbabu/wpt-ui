import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { BrowserRouter, Route } from "react-router-dom";
import getTheme from "./util/get-theme";
import HomePage from "./containers/HomePage";
import CompareTestsPage from "./containers/CompareTestsPage";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider muiTheme={getTheme()}>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/compare" component={CompareTestsPage} />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}
