const BaseError = require("./BaseError.js");
const { StatusCodes } = require("http-status-codes");

class NotImplemented extends BaseError {
  constructor(methodName) {
    super(
      "NotImplemented.js",
      StatusCodes.NOT_IMPLEMENTED,
      `${methodName} not implemented`,
      {}
    );
  }
}

module.exports = NotImplemented;
