import getMuiTheme from "material-ui/styles/getMuiTheme";
import { blue600 } from "material-ui/styles/colors";

export default function getTheme() {
  return getMuiTheme({
    datePicker: {
      selectColor: blue600
    },
    palette: {
      primary1Color: blue600,
      accent1Color: blue600,
      pickerHeaderColor: blue600
    },
    flatButton: {
      primaryTextColor: blue600
    }
  });
}
