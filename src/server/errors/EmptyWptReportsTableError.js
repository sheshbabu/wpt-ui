const BaseError = require("./BaseError");
const ErrorCodes = require("../../common/constants/ErrorCodes.json");

class EmptyWptReportsTableError extends BaseError {
  constructor() {
    const message = "No tests found in database";
    const errorCode = ErrorCodes.EMPTY_WPT_REPORTS_TABLE;
    super(message, errorCode);
  }
}

module.exports = EmptyWptReportsTableError;
