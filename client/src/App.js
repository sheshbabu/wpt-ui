import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavBar from "./containers/NavBar";

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <NavBar />
      </MuiThemeProvider>
    );
  }
}
