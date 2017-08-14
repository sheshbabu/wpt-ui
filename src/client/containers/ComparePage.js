import React from "react";
import moment from "moment";
import queryString from "query-string";

export default class ComparePage extends React.Component {
  constructor() {
    super();
    this.state = {
      oldTest: null,
      newTest: null
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
    const response = await fetch(url);
    const tests = await response.json();

    if (moment(tests[0].created_at).isBefore(tests[1].created_at)) {
      this.setState({
        oldTest: tests[0],
        newTest: tests[1]
      });
    } else {
      this.setState({
        oldTest: tests[1],
        newTest: tests[0]
      });
    }
  }

  render() {
    const { oldTest, newTest } = this.state;

    if (!oldTest || !newTest) {
      return null;
    }

    return (
      <div>
        <div>
          {oldTest.created_at}
        </div>
        <div>
          {newTest.created_at}
        </div>
      </div>
    );
  }
}
