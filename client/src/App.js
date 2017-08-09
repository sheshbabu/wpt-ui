import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import NavBar from "./components/NavBar";
import TestsListPage from "./containers/TestsListPage";
import { blue600 } from "material-ui/styles/colors";

const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: blue600
  },
  palette: {
    pickerHeaderColor: blue600
  },
  flatButton: {
    primaryTextColor: blue600
  }
});

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <NavBar />
          <TestsListPage />
        </div>
      </MuiThemeProvider>
    );
  }
}
