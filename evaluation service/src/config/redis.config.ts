import Redis from "ioredis";

import serverConfig from "./server.config";

const redis = new Redis({
   port: serverConfig.REDIS_PORT,
   host: serverConfig.REDIS_HOST,
   password: serverConfig.REDIS_PASS,
   maxRetriesPerRequest: null,
});

redis.on("connect", () => {
   console.log("connected to Redis");
});

redis.on("error", (err) => {
   console.error("error connecting to Redis: ", err);
});

export default redis;
