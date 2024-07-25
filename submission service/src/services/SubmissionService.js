const getProblemDetails = require("../apis/problems.api.js");
const CreationError = require("../errors/CreationError.js");
const SubmissionProducer = require("../producers/submission.queue.js");
const NotFound = require("../errors/NotFound.js");

class SubmissionService {
  constructor(submissionRepository) {
    this.submissionRepository = submissionRepository;
  }

  async addSubmission(submissionPayload) {
    try {
      const problemId = submissionPayload.problemId;
      const problemData = await getProblemDetails(problemId);

      const langCodeStub = problemData.data.codeStubs.find(
        (codeStub) =>
          codeStub.language.toLowerCase() ===
          submissionPayload.language.toLowerCase()
      );

      submissionPayload.language = submissionPayload.language.toUpperCase();

      submissionPayload.code =
        langCodeStub.startSnippet +
        "\n" +
        submissionPayload.code +
        "\n" +
        langCodeStub.endSnippet;

      const submission = await this.submissionRepository.createSubmission(
        submissionPayload
      );
      if (!submission || submission.length === 0) {
        throw new CreationError("failed to create a new submission");
      }

      const inputCases = problemData.data.testCases.map(
        (testCase) => testCase.input
      );
      const outputCases = problemData.data.testCases.map(
        (testCase) => testCase.output
      );

      await SubmissionProducer({
        [submission._id]: {
          code: submission.code,
          language: submission.language,
          inputCase: inputCases,
          outputCase: outputCases,
          userId: submission.userId,
          submissionId: submission._id,
        },
      });
      return submission;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateSubmissionStatus(submissionId, status) {
    const response = await this.submissionRepository.updateSubmissionStatus(
      submissionId,
      status
    );
    if (!response || response.length === 0) {
      throw new BadRequest(
        "updateSubmissionStatus",
        `failed to update status for submission Id: $submissionId}`
      );
    }
    console.log(
      `Updated submission status for submission Id ${submissionId} with status ${status}`
    );
  }

  async getSubmissions(userId) {
    const response = await this.submissionRepository.getSubmissions(userId);
    if (!response || response.length === 0) {
      throw new NotFound("getSubmissions", userId);
    }
    return response;
  }
}

module.exports = SubmissionService;
