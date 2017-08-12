import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getTheme from "./util/get-theme";
import NavBar from "./containers/NavBar";
import TestsListPage from "./containers/TestsListPage";

export class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getTheme()}>
        <div>
          <NavBar />
          <TestsListPage />
        </div>
      </MuiThemeProvider>
    );
  }
}
