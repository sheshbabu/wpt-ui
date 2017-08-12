const createTest = require("./create-test");
const updateTest = require("./update-test");
const getTest = require("./get-test");
const getTests = require("./get-tests");
const getMultipleTests = require("./get-multiple-tests");
const getTestsWithinDateRange = require("./get-tests-within-date-range");

module.exports = {
  createTest,
  updateTest,
  getTest,
  getTests,
  getMultipleTests,
  getTestsWithinDateRange
};
