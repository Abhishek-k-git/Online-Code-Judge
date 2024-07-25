const { StatusCodes } = require("http-status-codes");

async function createSubmission(req, res) {
  try {
    const response = await this.submissionService.addSubmission(req.body);
    return res.status(StatusCodes.CREATED).send({
      error: {},
      data: response,
      success: true,
      message: "Created submission successfully",
    });
  } catch (error) {
    throw error;
  }
}

async function getSubmissions(req, res) {
  try {
    const userId = req.params.userId;
    const submissions = await this.submissionService.getSubmissions(userId);
    return res.status(StatusCodes.OK).send({
      error: {},
      data: submissions,
      success: true,
      message: `Fetched submissions for user ${userId} successfully`,
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { getSubmissions, createSubmission };
