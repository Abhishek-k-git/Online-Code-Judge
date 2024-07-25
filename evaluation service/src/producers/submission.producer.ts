import submissionQueue from "../queues/submission.queue";

export default async function (payload: Record<string, unknown>) {
   const submissionId = Object.values(payload)[3];
   console.log(
      "\nSubmission response for submission Id: ",
      submissionId,
      "\n",
      payload,
      "\n"
   );
   await submissionQueue.add("SubmissionJob", payload);
}
