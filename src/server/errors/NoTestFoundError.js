const BaseError = require("./BaseError");
const StatusCodes = require("../../common/constants/StatusCodes.json");
const ErrorCodes = require("../../common/constants/ErrorCodes.json");

class NoTestFoundError extends BaseError {
  constructor(testId) {
    const message = `Test with testId ${testId} not found`;
    const errorCode = ErrorCodes.NO_TEST_FOUND;
    const statusCode = StatusCodes.NOT_FOUND;
    super(message, errorCode, statusCode);
  }
}

module.exports = NoTestFoundError;
