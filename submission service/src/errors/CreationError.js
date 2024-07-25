const BaseError = require("./BaseError.js");
const { StatusCodes } = require("http-status-codes");

class CreationError extends BaseError {
  constructor(details) {
    super("CreationError", StatusCodes.BAD_REQUEST, details);
  }
}

module.exports = CreationError;
