const BaseError = require("./BaseError");

class NoTestFoundError extends BaseError {
  constructor() {
    const message = `No tests found`;
    super(message);
  }
}

module.exports = NoTestFoundError;
