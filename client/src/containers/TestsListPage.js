import React from "react";
import moment from "moment";
import FilterToolbar from "../components/FilterToolbar";
import BarChart from "../components/BarChart";
import TestsTable from "../components/TestsTable";

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
        <BarChart
          width={900}
          height={300}
          labels={getChartLabels(this.state.tests)}
          datasets={getChartDatasets(this.state.tests)}
        />
        <TestsTable tests={this.state.tests} />
      </div>
    );
  }
}

function getChartLabels(tests) {
  return tests.map(test => moment(test.created_at).format("YYYY MMM DD"));
}

function getChartDatasets(tests) {
  return [
    {
      label: "FirstView TTFB",
      data: tests.map(test => test.fv_ttfb)
    },
    {
      label: "FirstView First Paint",
      data: tests.map(test => test.fv_first_paint)
    }
  ];
}
