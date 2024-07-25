const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/server.config.js");
const apiRouter = require("./routes");
const { errorHandler } = require("./utils");
const DatabaseConn = require("./config/DatabaseConn.js");
const { StatusCodes } = require("http-status-codes");

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

app.get("/", (req, res) => {
  return res.status(StatusCodes.OK).json({ message: "service is live" });
});

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`server is running at port ${PORT}`);
  await DatabaseConn.connect();
});
