import evaluationQueue from "../queues/evaluation.queue";

export default async function (payload: Record<string, unknown>) {
  const submissionId = Object.values(payload)[3];
  console.log(
    "\nEvaluation response for submission Id: ",
    submissionId,
    "\n",
    payload,
    "\n"
  );

  await evaluationQueue.add("EvaluationJob", payload);
}
