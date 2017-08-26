const BaseError = require("./BaseError");
const StatusCodes = require("../../common/constants/StatusCodes.json");
const ErrorCodes = require("../../common/constants/ErrorCodes.json");

class NoTestsFoundForDateRangeError extends BaseError {
  constructor() {
    const message =
      "No tests found for the date range! Maybe try a different range?";
    const statusCode = StatusCodes.NOT_FOUND;
    const errorCode = ErrorCodes.NO_TESTS_FOUND_FOR_DATE_RANGE;
    super(message, errorCode, statusCode);
  }
}

module.exports = NoTestsFoundForDateRangeError;
