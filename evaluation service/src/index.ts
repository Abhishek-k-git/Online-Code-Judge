import express, { Express, Response } from "express";

import bullBoardAdapter from "./config/bullBoard.config";
import serverConfig from "./config/server.config";
import apiRouter from "./routes";
import submissionWorker from "./workers/submission.worker";

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

app.get("/", (_, res: Response) => {
   return res.json({ message: "service is live" });
});

app.use("/api", apiRouter);
app.use("/ui", bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, async () => {
   console.log(`server is running at port ${serverConfig.PORT}`);
   console.log(
      `BullBoard dashboard running on: http://localhost:${serverConfig.PORT}/ui`
   );
   submissionWorker("SubmissionQueue");
});
