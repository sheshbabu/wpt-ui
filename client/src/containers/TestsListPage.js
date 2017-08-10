import React from "react";
import autobind from "react-autobind";
import moment from "moment";
import queryString from "query-string";
import FilterToolbar from "../components/FilterToolbar";
import BarChart from "../components/BarChart";
import TestsTable from "../components/TestsTable";

export default class TestsListPage extends React.PureComponent {
  constructor() {
    super();
    autobind(this);
    this.state = {
      tests: [],
      startDate: "",
      endDate: "",
      metric1: "",
      metric2: ""
    };
  }

  componentDidMount() {
    this.fetchTests();
  }

  async fetchTests() {
    let url = "/api/tests";
    const { startDate, endDate } = this.state;

    if (startDate && endDate) {
      const queryParams = {};
      queryParams.start_date = startDate;
      queryParams.end_date = endDate;
      url = `${url}?${queryString.stringify(queryParams)}`;
    } else if ((startDate && !endDate) || (!startDate && endDate)) {
      return;
    }

    const response = await fetch(url);
    const tests = await response.json();
    this.setState({ tests });
  }

  handleStartDateChange(event, date) {
    this.setState({ startDate: moment(date).format("YYYY-MM-DD") });
    this.fetchTests();
  }

  handleEndDateChange(event, date) {
    this.setState({ endDate: moment(date).format("YYYY-MM-DD") });
    this.fetchTests();
  }

  handleMetric1Change(event, key) {
    this.setState({ metric1: key });
  }

  handleMetric2Change(event, key) {
    this.setState({ metric2: key });
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
        <FilterToolbar
          onStartDateChange={this.handleStartDateChange}
          onEndDateChange={this.handleEndDateChange}
          onMetric1Change={this.handleMetric1Change}
          onMetric2Change={this.handleMetric2Change}
        />
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
