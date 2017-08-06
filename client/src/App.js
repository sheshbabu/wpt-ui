import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavBar from "./containers/NavBar";
import MainChart from "./containers/MainChart";

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar />
          <MainChart />
        </div>
      </MuiThemeProvider>
    );
  }
}
