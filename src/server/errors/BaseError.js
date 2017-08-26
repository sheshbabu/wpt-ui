class BaseError extends Error {
  constructor(message, errorCode = 0) {
    super(message);
    this.errorCode = errorCode;
  }
}

module.exports = BaseError;
