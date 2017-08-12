import React from "react";
import autobind from "react-autobind";
import moment from "moment";
import queryString from "query-string";
import FilterToolbar from "../components/FilterToolbar";
import BarChart from "../components/BarChart";
import TestsTable from "../components/TestsTable";
import FIELDS from "../constants/fields.json";

export default class TestsListPage extends React.PureComponent {
  constructor() {
    super();
    autobind(this);
    this.state = {
      tests: [],
      startDate: "",
      endDate: "",
      metric1: "fv_start_render",
      metric2: "fv_load_time"
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

  handleMetric1Change(event, index, value) {
    const fields = getComparableFields();
    const columnName = fields[value].columnName;
    this.setState({ metric1: columnName });
  }

  handleMetric2Change(event, index, value) {
    const fields = getComparableFields();
    const columnName = fields[value].columnName;
    this.setState({ metric2: columnName });
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
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          metric1={this.state.metric1}
          metric2={this.state.metric2}
          onStartDateChange={this.handleStartDateChange}
          onEndDateChange={this.handleEndDateChange}
          onMetric1Change={this.handleMetric1Change}
          onMetric2Change={this.handleMetric2Change}
          fields={getComparableFields()}
        />
        <BarChart
          width={900}
          height={300}
          labels={getChartLabels(this.state.tests)}
          datasets={getChartDatasets(this.state)}
        />
        <TestsTable tests={this.state.tests} fields={getTableFields()} />
      </div>
    );
  }
}

function getChartLabels(tests) {
  return tests.map(test => moment(test.created_at).format("YYYY MMM DD"));
}

function getChartDatasets(state) {
  const fields = getComparableFields();
  const label1 = fields.find(field => field.columnName === state.metric1);
  const label2 = fields.find(field => field.columnName === state.metric2);
  return [
    {
      label: label1.displayName,
      data: state.tests.map(test => test[state.metric1])
    },
    {
      label: label2.displayName,
      data: state.tests.map(test => test[state.metric2])
    }
  ];
}

function getComparableFields() {
  return FIELDS.filter(field => {
    const omittedFields = [
      "created_at",
      "test_id",
      "status",
      "url",
      "json_url",
      "summary_url",
      "location",
      "connectivity",
      "browser_name",
      "browser_version",
      "fv_domain_breakdown",
      "fv_content_breakdown",
      "rv_domain_breakdown",
      "rv_content_breakdown"
    ];
    return !omittedFields.includes(field.columnName);
  });
}

function getTableFields() {
  return FIELDS.filter(field => {
    const omittedFields = [
      "url",
      "json_url",
      "location",
      "connectivity",
      "browser_name",
      "browser_version",
      "fv_domain_breakdown",
      "fv_content_breakdown",
      "rv_domain_breakdown",
      "rv_content_breakdown"
    ];
    return !omittedFields.includes(field.columnName);
  });
}
