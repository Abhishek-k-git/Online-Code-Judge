const BaseError = require("../errors/BaseError.js");
const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger.config.js");

function errorHandler(error, request, reply) {
  if (error instanceof BaseError) {
    return reply.status(error.statusCode).send({
      success: false,
      message: error.message,
      error: error.details,
      data: {},
    });
  }

  let stackLine = error.stack.split("\n")[1]?.split("(")[0]?.trim();
  logger.error(`msg: [${error.message}, ${stackLine}], ip: [${request.ip}]`);
  return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: "something went wrong!",
    error: error.message || error,
    data: {},
  });
}

module.exports = errorHandler;
