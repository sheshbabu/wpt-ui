import React from "react";
import moment from "moment";
import FilterToolbar from "../components/FilterToolbar";
import BarChart from "../components/BarChart";
import TestsTable from "../components/TestsTable";

const chartProps = {
  width: 900,
  height: 300,
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
      data: [300, 350, 350, 320, 300]
    },
    {
      label: "FirstView First Paint",
      data: [1000, 1200, 1200, 1150, 1000]
    }
  ]
};

export default class TestsListPage extends React.Component {
  constructor() {
    super();
    this.state = {
      tests: []
    };
  }

  async componentDidMount() {
    const response = await fetch("/api/tests");
    this.setState({
      tests: await response.json()
    });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 20
        }}
      >
        <FilterToolbar />
        <BarChart {...chartProps} />
        <TestsTable tests={this.state.tests} />
      </div>
    );
  }
}