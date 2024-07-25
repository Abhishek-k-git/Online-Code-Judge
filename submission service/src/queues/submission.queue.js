const { Queue } = require("bullmq");
const redis = require("../config/redis.config.js");

module.exports = new Queue("SubmissionQueue", { connection: redis });
