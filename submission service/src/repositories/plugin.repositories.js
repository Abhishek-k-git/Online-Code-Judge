const fp = require("fastify-plugin");
const SubmissionRepository = require("./SubmissionRepository.js");

async function repopsitoryPlugin(fastify, options) {
  fastify.decorate("submissionRepository", new SubmissionRepository());
}

module.exports = fp(repopsitoryPlugin);
