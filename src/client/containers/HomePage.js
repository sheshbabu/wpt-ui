import React from "react";
import autobind from "react-autobind";
import moment from "moment";
import queryString from "query-string";
import fetchWrapper from "../util/fetch-wrapper";
import Snackbar from "material-ui/Snackbar";
import FilterToolbar from "../components/FilterToolbar";
import BarChart from "../components/BarChart";
import TableToolbar from "../components/TableToolbar";
import TestsTable from "../components/TestsTable";
import ErrorSection from "../components/ErrorSection";
import FIELDS from "../constants/fields.json";
import ErrorCodes from "../../common/constants/ErrorCodes.json";

export default class HomePage extends React.PureComponent {
  constructor() {
    super();
    autobind(this);
    this.state = {
      tests: [],
      startDate: "",
      endDate: "",
      metric1: "fv_start_render",
      metric2: "fv_load_time",
      selectedTests: [],
      isSnackbarOpen: false,
      snackbarMessage: "",
      isError: false,
      errorCode: 0,
      errorMessage: ""
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

    try {
      const tests = await fetchWrapper(url);
      this.setState({
        tests,
        isError: false
      });
    } catch (error) {
      if (
        error.errorCode === ErrorCodes.NO_TEST_CREATED ||
        error.errorCode === ErrorCodes.NO_TESTS_FOUND_FOR_DATE_RANGE
      ) {
        this.setState({
          tests: [],
          isError: true,
          errorCode: error.errorCode,
          errorMessage: error.message
        });
      }
    }
  }

  startTest() {
    return fetch("/api/tests", { method: "POST" });
  }

  showSnackbar(message) {
    this.setState({
      isSnackbarOpen: true,
      snackbarMessage: message
    });
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

  handleRowSelection(selectedTests) {
    this.setState({ selectedTests });
  }

  async handleStartNewTestClick() {
    await this.startTest();
    await this.fetchTests();
    this.showSnackbar("Started new test");
  }

  handleCompareTestClick() {
    const testId1 = this.state.selectedTests[0];
    const testId2 = this.state.selectedTests[1];
    this.props.history.push(
      `/compare?test_id_1=${testId1}&test_id_2=${testId2}`
    );
  }

  handleSnackbarHide() {
    this.setState({
      isSnackbarOpen: false,
      snackbarMessage: ""
    });
  }

  getErrorSection() {
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
        <ErrorSection
          errorCode={this.state.errorCode}
          errorMessage={this.state.errorMessage}
        />
      </div>
    );
  }

  render() {
    if (this.state.isError) {
      return this.getErrorSection();
    }

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
          labels={getChartLabels(this.state)}
          datasets={getChartDatasets(this.state)}
        />
        <TableToolbar
          selectedTests={this.state.selectedTests}
          onStartNewTestClick={this.handleStartNewTestClick}
          onCompareTestClick={this.handleCompareTestClick}
        />
        <TestsTable
          tests={this.state.tests}
          fields={getTableFields()}
          selectedTests={this.state.selectedTests}
          onRowSelection={this.handleRowSelection}
        />
        <Snackbar
          open={this.state.isSnackbarOpen}
          message="Started new test"
          autoHideDuration={3000}
          onRequestClose={this.handleSnackbarHide}
        />
      </div>
    );
  }
}

function getChartLabels(state) {
  const tests = sortAndFilterTestsForChart(state.tests);
  return tests.map(test => moment(test.created_at).format("YYYY MMM DD"));
}

function getChartDatasets(state) {
  const tests = sortAndFilterTestsForChart(state.tests);
  const fields = getComparableFields();
  const label1 = fields.find(field => field.columnName === state.metric1);
  const label2 = fields.find(field => field.columnName === state.metric2);
  return [
    {
      label: label1.displayName,
      data: tests.map(test => test[state.metric1])
    },
    {
      label: label2.displayName,
      data: tests.map(test => test[state.metric2])
    }
  ];
}

function sortAndFilterTestsForChart(tests) {
  const testsClone = tests.slice(0).filter(test => test.status !== "pending");
  return testsClone.sort((test1, test2) => {
    if (test1.created_at === test2.created_at) {
      return 0;
    }

    if (moment(test1.created_at).isBefore(test2.created_at)) {
      return -1;
    } else {
      return 1;
    }
  });
}

function getComparableFields() {
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
  return FIELDS.filter(field => !omittedFields.includes(field.columnName));
}

function getTableFields() {
  return FIELDS.filter(field => {
    const omittedFields = [
      "status",
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
