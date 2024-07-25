const fp = require("fastify-plugin");
const SubmissionService = require("./SubmissionService.js");

async function servicePlugin(fastify, options) {
  fastify.decorate(
    "submissionService",
    new SubmissionService(fastify.submissionRepository)
  );
}

module.exports = fp(servicePlugin);
