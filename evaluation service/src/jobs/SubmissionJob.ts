import { Job } from "bullmq";
import evalQueueProducer from "../producers/evaluation.producer";
import { ExecuteResType } from "../types/execute.type";
import createExecutor from "../utils/executer.util";

interface JobInterface {
  payload?: Record<string, unknown>;
  handle: (job?: Job) => void;
}
type PayloadType = {
  code: string;
  language: string;
  inputCase: string;
  outputCase: string;
  userId: string;
  submissionId: string;
};

class SubmissionJob implements JobInterface {
  payload: Record<string, PayloadType>;

  constructor(payload: Record<string, PayloadType>) {
    this.payload = payload;
  }

  async handle(job?: Job) {
    if (!job) {
      throw new Error("Job parameter is required.");
    }

    const key = Object.keys(this.payload)[0];
    const codeLang = this.payload[key].language;
    const code = this.payload[key].code;

    const inputCases = Array.isArray(this.payload[key].inputCase)
      ? this.payload[key].inputCase
      : [];
    const outputCases = Array.isArray(this.payload[key].outputCase)
      ? this.payload[key].outputCase
      : [];

    const testCases = inputCases.map((input: string, index: number) => ({
      input,
      output: outputCases[index],
    }));

    const strategy = createExecutor(codeLang);

    if (strategy != null) {
      const executePromises = testCases.map(async (testCase) => {
        return strategy.execute(code, testCase.input, testCase.output);
      });

      const results: ExecuteResType[] = await Promise.all(executePromises);

      const successfull = results.every(
        (result) => result.status === "SUCCESS"
      );

      const hasError = results.some(
        (result) =>
          result.status === "RE" ||
          result.status === "TLE" ||
          result.status === "MLE" ||
          result.status === "WA"
      );

      let status: string;

      if (successfull) {
        status = "SUCCESS";
      } else if (hasError) {
        status = results.find(
          (result) =>
            result.status === "RE" ||
            result.status === "TLE" ||
            result.status === "MLE" ||
            result.status === "WA"
        )!.status;
      } else {
        status = "UNKNOWN";
      }

      evalQueueProducer({
        status: status,
        response: results,
        userId: this.payload[key].userId,
        submissionId: this.payload[key].submissionId,
      });
    }
  }
}

export default SubmissionJob;
