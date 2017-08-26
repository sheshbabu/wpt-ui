const BaseError = require("./BaseError");
const ErrorCodes = require("../../common/constants/ErrorCodes.json");

class NoTestsFoundError extends BaseError {
  constructor() {
    const message = "No tests found for the query";
    const errorCode = ErrorCodes.NO_TESTS_FOUND;
    super(message, errorCode);
  }
}

module.exports = NoTestsFoundError;
