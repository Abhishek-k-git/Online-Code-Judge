const Redis = require("ioredis"); // redis client for nodejs
const { REDIS_PORT, REDIS_HOST, REDIS_PASS } = require("./server.config.js");

const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
  password: REDIS_PASS,
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("connected to Redis");
});

redis.on("error", (err) => {
  console.error("error connecting to Redis: ", err);
});

module.exports = redis;
