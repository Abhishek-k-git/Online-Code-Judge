const BaseError = require("../errors/BaseError.js");
const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger.config.js");

function errorHandler(err, req, res, next) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.details,
      data: {},
    });
  }

  let stackLine = err.stack.split("\n")[1]?.split("(")[0]?.trim();
  logger.error(`msg: [${err.message}, ${stackLine}], ip: [${req.ip}]`);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "something went wrong",
    error: err,
    data: {},
  });
}

module.exports = errorHandler;
