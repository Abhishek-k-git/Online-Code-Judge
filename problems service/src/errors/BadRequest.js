const BaseError = require("./BaseError.js");
const { StatusCodes } = require("http-status-codes");

class BadRequest extends BaseError {
  constructor(propertyName, details) {
    super(
      "BadRequest.js",
      StatusCodes.BAD_REQUEST,
      `invalid structure for ${propertyName} provided`,
      details
    );
  }
}

module.exports = BadRequest;
