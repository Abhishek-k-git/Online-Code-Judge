const submissionQueue = require("../queues/submission.queue.js");

module.exports = async function (payload) {
  const key = Object.keys(payload)[0];
  console.log("\nAdding submission job with submission Id: ", key, "\n");
  await submissionQueue.add("SubmissionJob", payload);
};
