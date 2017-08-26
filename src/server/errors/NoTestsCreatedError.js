const BaseError = require("./BaseError");
const StatusCodes = require("../../common/constants/StatusCodes.json");
const ErrorCodes = require("../../common/constants/ErrorCodes.json");

class NoTestsCreatedError extends BaseError {
  constructor() {
    const message = "No tests created yet!";
    const errorCode = ErrorCodes.NO_TEST_CREATED;
    const statusCode = StatusCodes.NOT_FOUND;
    super(message, errorCode, statusCode);
  }
}

module.exports = NoTestsCreatedError;
