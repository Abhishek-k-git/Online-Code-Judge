const fp = require("fastify-plugin");
const fcors = require("@fastify/cors");

const servicePlugin = require("./services/plugin.services.js");
const repopsitoryPlugin = require("./repositories/plugin.repositories.js");
const apiRoutes = require("./routes/api/apiRoutes");

async function app(fastify, options) {
  await fastify.register(fcors);
  await fastify.register(repopsitoryPlugin);
  await fastify.register(servicePlugin);
  await fastify.register(apiRoutes, { prefix: "/api" });
}

module.exports = fp(app);
