import { Job, Worker } from "bullmq";
import redis from "../config/redis.config";
import SubmissionJob from "../jobs/SubmissionJob";

function submissionWorker(queueName: string) {
   new Worker(
      queueName,
      async (job?: Job) => {
         if (job?.name === "SubmissionJob") {
            console.log("\nPulling job\n", job.data);
            const submissionJobInstance = new SubmissionJob(job.data);
            submissionJobInstance.handle(job);
            return true;
         }
      },
      {
         connection: redis,
      }
   );
}
export default submissionWorker;
