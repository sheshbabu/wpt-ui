import React from "react";
import Paper from "material-ui/Paper";
import { Bar } from "react-chartjs-2";
import {
  deepPurple400,
  deepPurple600,
  deepPurple800,
  deepPurple900
} from "material-ui/styles/colors";

export default function BarChart(props) {
  const chartData = {
    labels: props.labels,
    datasets: getChartDatasets(props.datasets)
  };
  const chartOptions = {
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
      yAxes: getYAxesOptions(props.datasets)
    }
  };
  const paperStyles = {
    width: props.width,
    height: props.height,
    backgroundColor: deepPurple600,
    padding: 10
  };
  return (
    <Paper style={paperStyles} zDepth={1}>
      <Bar
        width={props.width}
        height={props.height}
        style={{ backgroundColor: deepPurple600 }}
        data={chartData}
        options={chartOptions}
      />
    </Paper>
  );
}

function getChartDatasets(datasets) {
  let datasetConfig1 = {
    yAxisID: "y-axis-0",
    backgroundColor: deepPurple900,
    hoverBackgroundColor: deepPurple400
  };
  let datasetConfig2 = {
    yAxisID: "y-axis-1",
    backgroundColor: deepPurple800,
    hoverBackgroundColor: deepPurple400
  };

  datasetConfig1 = Object.assign({}, datasetConfig1, datasets[0]);

  if (datasets.length === 2) {
    datasetConfig2 = Object.assign({}, datasetConfig2, datasets[1]);
    return [datasetConfig1, datasetConfig2];
  }

  return [datasetConfig1];
}

function getYAxesOptions(datasets) {
  const option1 = {
    id: "y-axis-0",
    position: "left",
    gridLines: {
      display: false,
      drawBorder: false
    },
    ticks: {
      beginAtZero: true
    }
  };
  const option2 = {
    id: "y-axis-1",
    position: "right",
    gridLines: {
      display: false,
      drawBorder: false
    },
    ticks: {
      beginAtZero: true
    }
  };

  if (datasets.length === 2) {
    return [option1, option2];
  }

  return [option1];
}
