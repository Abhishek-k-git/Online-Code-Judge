import express from "express";

import submissionRouter from "./submission.router";

const v1Router = express.Router();
v1Router.use("/submission", submissionRouter);

export default v1Router;
