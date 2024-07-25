const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Redis = require("ioredis");

const { PORT, REDIS_PORT, REDIS_HOST, REDIS_PASS } = require("./config.js");

const app = express();
app.use(express.json());
const httpServer = createServer(app);

const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
  password: REDIS_PASS,
  maxRetriesPerRequest: null,
});

const io = new Server(httpServer, {
  cors: {
    // submission service
    origin: "*",
    methods: ["POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket on");
  socket.on("setUserId", (userId) => {
    console.log(`Setting user id ${userId}, to connection id ${socket.id}`);
    redis.set(userId, socket.id);
  });

  socket.on("getConnectionId", async (userId) => {
    const connId = await redis.get(userId);
    console.log(`Getting connection id ${connId}, for user id ${userId}`);
    socket.emit("connectionId", connId);
    const everything = await redis.keys("*");
    console.log(everything);
  });
});

app.post("/evaluationResult", async (req, res) => {
  console.log(req.body);
  const { userId, payload } = req.body;
  if (!userId || !payload) {
    return res.status(400).send("Invalid request");
  }
  const socketId = await redis.get(userId);
  console.log("socketId: ", socketId);

  if (socketId) {
    io.to(socketId).emit("evalResultResponse", payload);
    return res.send("Response sent successfully");
  } else {
    return res.status(404).send("User not connected");
  }
});

httpServer.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
