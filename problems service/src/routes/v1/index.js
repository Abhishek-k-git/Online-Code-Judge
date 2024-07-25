const express = require("express");

const problemRoutes = require("./problem.router.js");

const v1Router = express.Router();

v1Router.use("/problems", problemRoutes);

module.exports = v1Router;
