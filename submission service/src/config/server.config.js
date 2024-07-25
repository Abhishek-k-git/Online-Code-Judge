const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  NODE_ENV: process.env.NODE_ENV,
  REDIS_PORT: process.env.REDIS_PORT || "6379",
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_PASS: process.env.REDIS_PASS || "",
  PROBLEM_SERVICE_BASE_URL: process.env.PROBLEM_SERVICE_BASE_URL, // url of problem service
};
