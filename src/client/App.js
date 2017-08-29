import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import getTheme from "./util/get-theme";
import ListPage from "./containers/ListPage";
import ComparePage from "./containers/ComparePage";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider muiTheme={getTheme()}>
          <div>
            <Redirect from="/" to="/tests" />
            <Route path="/tests" component={ListPage} />
            <Route path="/compare" component={ComparePage} />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}
