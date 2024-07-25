const fastify = require("fastify");
const submissionRoutes = require("./submission.routes.js");

async function v1Routes(fastify, options) {
  fastify.register(submissionRoutes, { prefix: "/submission" });
}

module.exports = v1Routes;
