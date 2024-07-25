const Submission = require("../models/submission.model.js");

class SubmissionRepository {
  constructor() {
    this.submissionModel = Submission;
  }

  async createSubmission(submission) {
    try {
      const response = await this.submissionModel.create(submission);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSubmissions(userId) {
    try {
      const response = await this.submissionModel.find({ userId: userId });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateSubmissionStatus(submissionId, status) {
    try {
      const response = await this.submissionModel.findOneAndUpdate(
        { _id: submissionId },
        { status: status },
        {
          new: true,
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = SubmissionRepository;
