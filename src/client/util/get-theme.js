import getMuiTheme from "material-ui/styles/getMuiTheme";
import { deepPurple600 } from "material-ui/styles/colors";

export default function getTheme() {
  return getMuiTheme({
    datePicker: {
      selectColor: deepPurple600
    },
    palette: {
      textColor: "#666",
      primary1Color: deepPurple600,
      accent1Color: deepPurple600,
      pickerHeaderColor: deepPurple600
    },
    flatButton: {
      primaryTextColor: deepPurple600
    }
  });
}
