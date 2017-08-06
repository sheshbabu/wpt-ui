import React from "react";
import moment from "moment";
import Paper from "material-ui/Paper";
import { Chart } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { blue400, blue600, blue700, blue800 } from "material-ui/styles/colors";

const chartData = {
  labels: [
    moment("2017-08-06 12:00:00.801277+08").format("YYYY MMM DD"),
    moment("2017-09-07 12:00:00.801277+08").format("YYYY MMM DD"),
    moment("2017-09-07 12:00:00.801277+08").format("YYYY MMM DD"),
    moment("2017-09-20 12:00:00.801277+08").format("YYYY MMM DD"),
    moment("2017-10-30 12:00:00.801277+08").format("YYYY MMM DD")
  ],
  datasets: [
    {
      label: "FirstView TTFB",
      data: [300, 350, 350, 320, 300],
      yAxisID: "y-axis-0",
      backgroundColor: blue700,
      hoverBackgroundColor: blue400
    },
    {
      label: "FirstView First Paint",
      data: [1000, 1200, 1200, 1150, 1000],
      yAxisID: "y-axis-1",
      backgroundColor: blue800,
      hoverBackgroundColor: blue400
    }
  ]
};

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

export default function MainChart() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <Paper
        style={{
          width: 900,
          height: 300,
          backgroundColor: blue600,
          padding: 10
        }}
        zDepth={1}
      >
        <Bar
          width={900}
          height={300}
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            layout: {
              padding: 40
            },
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                    drawBorder: false
                  }
                }
              ],
              yAxes: [
                {
                  id: "y-axis-0",
                  position: "left",
                  gridLines: {
                    display: false,
                    drawBorder: false
                  },
                  ticks: {
                    beginAtZero: true
                  }
                },
                {
                  id: "y-axis-1",
                  position: "right",
                  gridLines: {
                    display: false,
                    drawBorder: false
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }}
          style={{ backgroundColor: blue600 }}
        />
      </Paper>
    </div>
  );
}
