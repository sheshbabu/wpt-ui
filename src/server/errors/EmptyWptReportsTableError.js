const BaseError = require("./BaseError");
const StatusCodes = require("../../common/constants/StatusCodes.json");
const ErrorCodes = require("../../common/constants/ErrorCodes.json");

class EmptyWptReportsTableError extends BaseError {
  constructor() {
    const message = "No tests created yet!";
    const errorCode = ErrorCodes.EMPTY_WPT_REPORTS_TABLE;
    const statusCode = StatusCodes.NOT_FOUND;
    super(message, errorCode, statusCode);
  }
}

module.exports = EmptyWptReportsTableError;
