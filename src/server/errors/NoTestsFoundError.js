const BaseError = require("./BaseError");
const StatusCodes = require("../../common/constants/StatusCodes.json");
const ErrorCodes = require("../../common/constants/ErrorCodes.json");

class NoTestsFoundError extends BaseError {
  constructor() {
    const message = "No tests found!";
    const statusCode = StatusCodes.NOT_FOUND;
    const errorCode = ErrorCodes.NO_TESTS_FOUND;
    super(message, errorCode, statusCode);
  }
}

module.exports = NoTestsFoundError;
