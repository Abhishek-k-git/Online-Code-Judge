const { Worker } = require("bullmq");
const redis = require("../config/redis.config.js");
const axios = require("axios");
const logger = require("../config/logger.config.js");
const SubmissionService = require("../services/SubmissionService.js");
const SubmissionRepository = require("../repositories/SubmissionRepository.js");

function evaluationWorker(queueName) {
  new Worker(
    queueName,
    async (job) => {
      if (job.name === "EvaluationJob") {
        try {
          console.log(
            "\nPulling evaluated job...",
            "\nsubmissionId: ",
            job.data.submissionId,
            "\nstatus: ",
            job.data.status,
            "\n"
          );

          const submissionService = new SubmissionService(
            new SubmissionRepository()
          );
          await submissionService.updateSubmissionStatus(
            job.data.submissionId,
            job.data.status
          );

          // socket server api
          await axios.post("http://localhost:5001/evaluationResult", {
            userId: job.data.userId,
            payload: job.data,
          });
        } catch (error) {
          // console.log(error);
          // throw error;
          let errLog;
          if (error.response) {
            errLog = `Axios Error (status: ${error.response.status}) ${error.response.data}`;
          } else if (error.request) {
            errLog = `Error communicating with the socket server: ${error.request}`;
          } else {
            errLog = `Error preparing the Axios request: ${error.message}`;
          }
          logger.error(
            `msg: [${errLog}, ${error.stack
              .split("\n")[1]
              ?.split("(")[0]
              ?.trim()}]`
          );
        }
      }
    },
    {
      connection: redis,
    }
  );
}

module.exports = evaluationWorker;
