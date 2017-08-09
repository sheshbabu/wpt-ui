const BaseError = require("./BaseError");

class NoTestFoundError extends BaseError {
  constructor(testId) {
    const message = `Test with testId ${testId} not found`;
    super(message);
  }
}

module.exports = NoTestFoundError;
