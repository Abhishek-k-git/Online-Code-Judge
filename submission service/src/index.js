const fastify = require("fastify")({ logger: true });

const app = require("./app.js");
const DatabaseConn = require("./config/DatabaseConn.js");
const { PORT } = require("./config/server.config.js");
const errorHandler = require("./utils/errorHandler.js");
const evaluationWorker = require("./workers/evaluation.worker.js");

fastify.register(app);
fastify.setErrorHandler(errorHandler);

fastify.listen({ port: PORT }, async (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`Server at port ${PORT}`);
  await DatabaseConn.connect();

  evaluationWorker("EvaluationQueue");
});
