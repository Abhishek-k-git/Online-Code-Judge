const BaseError = require("./BaseError.js");
const { StatusCodes } = require("http-status-codes");

class NotFound extends BaseError {
  constructor(resourceName, resourceValue) {
    super(
      "NotFound.js",
      StatusCodes.NOT_FOUND,
      `requested resource: ${resourceName} with value ${resourceValue} not found`,
      {
        resourceName,
        resourceValue,
      }
    );
  }
}

module.exports = NotFound;
