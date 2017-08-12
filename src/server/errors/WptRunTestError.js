const BaseError = require("./BaseError");

class WptRunTestError extends BaseError {
  constructor(response) {
    const message = response.statusText;
    super(message);
  }
}

module.exports = WptRunTestError;
