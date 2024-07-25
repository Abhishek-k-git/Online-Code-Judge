const {
  getSubmissions,
  createSubmission,
} = require("../../../controllers/submission.controller.js");

async function submissionRoutes(fastify, options) {
  fastify.post("/", createSubmission);
  fastify.get("/:userId", getSubmissions);
}

module.exports = submissionRoutes;
