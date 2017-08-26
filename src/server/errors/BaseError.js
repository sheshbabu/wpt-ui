const StatusCodes = require("../../common/constants/StatusCodes.json");

class BaseError extends Error {
  constructor(
    message,
    errorCode = 0,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

module.exports = BaseError;
