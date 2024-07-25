const express = require("express");

const { problemController } = require("../../controllers");

const problemRoutes = express.Router();

problemRoutes.get("/ping", problemController.pingProblem);

problemRoutes.get("/:id", problemController.getProblem);
problemRoutes.get("/", problemController.getProblems);

problemRoutes.post("/", problemController.addProblem);

problemRoutes.delete("/:id", problemController.deleteProblem);

problemRoutes.patch("/:id", problemController.updateProblem);

module.exports = problemRoutes;
