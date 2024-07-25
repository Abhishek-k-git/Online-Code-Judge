const v1Routes = require("./v1/v1Routes");

async function apiRoutes(fastify, options) {
  fastify.register(v1Routes, { prefix: "/v1" });
}

module.exports = apiRoutes;
