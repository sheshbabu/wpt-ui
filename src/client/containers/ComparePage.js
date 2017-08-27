import React from "react";
import moment from "moment";
import queryString from "query-string";
import CompareTable from "../components/CompareTable";
import fetchWrapper from "../util/fetch-wrapper";
import ErrorSection from "../components/ErrorSection";
import FIELDS from "../constants/fields.json";

export default class ComparePage extends React.Component {
  constructor() {
    super();
    this.state = {
      oldTest: null,
      newTest: null,
      isError: false,
      errorCode: 0,
      errorMessage: ""
    };
  }

  componentDidMount() {
    const queryParams = queryString.parse(window.location.search);
    const { test_id_1, test_id_2 } = queryParams;

    if (test_id_1 && test_id_2) {
      this.fetchTests(test_id_1, test_id_2);
    }
  }

  async fetchTests(testId1, testId2) {
    const url = `/api/tests?test_id=${testId1},${testId2}`;

    try {
      const tests = await fetchWrapper(url);
      let oldTest, newTest;

      if (moment(tests[0].created_at).isBefore(tests[1].created_at)) {
        oldTest = tests[0];
        newTest = tests[1];
      } else {
        oldTest = tests[1];
        newTest = tests[0];
      }
      this.setState({ oldTest, newTest, isError: false });
    } catch (error) {
      this.setState({
        isError: true,
        errorCode: error.errorCode,
        errorMessage: error.message
      });
    }
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
        <ErrorSection
          errorCode={this.state.errorCode}
          errorMessage={this.state.errorMessage}
        />
      </div>
    );
  }

  render() {
    const { oldTest, newTest, isError } = this.state;

    if (isError) {
      return this.getErrorSection();
    }

    if (!oldTest || !newTest) {
      return null;
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
        <CompareTable
          oldTest={oldTest}
          newTest={newTest}
          fields={getComparableFields()}
        />
      </div>
    );
  }
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
