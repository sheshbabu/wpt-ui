const BaseError = require("./BaseError");
const ErrorCodes = require("../../common/constants/ErrorCodes.json");

class NoTestFoundError extends BaseError {
  constructor(testId) {
    const message = `Test with testId ${testId} not found`;
    const errorCode = ErrorCodes.NO_TEST_FOUND;
    super(message, errorCode);
  }
}

module.exports = NoTestFoundError;
