import { Chart } from "react-chartjs-2";
import { blue600 } from "material-ui/styles/colors";

export function initChartJs() {
  Chart.defaults.global.defaultFontColor = "white";
  Chart.defaults.global.defaultFontFamily = "Roboto";
  Chart.defaults.global.tooltips.cornerRadius = 0;
  Chart.defaults.global.tooltips.xPadding = 10;
  Chart.defaults.global.tooltips.yPadding = 10;
  Chart.defaults.global.tooltips.displayColors = false;
  Chart.defaults.global.tooltips.backgroundColor = "white";
  Chart.defaults.global.tooltips.titleFontColor = "#bdbdbd";
  Chart.defaults.global.tooltips.bodyFontColor = blue600;
  Chart.defaults.global.tooltips.bodyFontSize = 15;
  Chart.defaults.global.tooltips.titleFontFamily = "Roboto";
  Chart.defaults.global.tooltips.bodyFontFamily = "Roboto";
  Chart.defaults.global.tooltips.titleFontStyle = "normal";
}
