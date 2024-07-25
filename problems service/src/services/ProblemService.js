const { markdownSanitizer } = require("../utils");

class ProblemService {
  constructor(problemRepository) {
    this.problemRepository = problemRepository;
  }

  async createProblem(data) {
    data.description = markdownSanitizer(data.description);
    data.editorial
      ? (data.editorial = markdownSanitizer(data.editorial))
      : delete data.editorial;

    const problem = await this.problemRepository.createProblem(data);
    return problem;
  }

  async getProblem(problemId) {
    const problem = await this.problemRepository.getProblem(problemId);
    return problem;
  }

  async getAllProblems() {
    const problems = await this.problemRepository.getAllProblems();
    return problems;
  }

  async deleteProblem(problemId) {
    const problem = await this.problemRepository.deleteProblem(problemId);
    return problem;
  }

  async updateProblem(id, updateData) {
    const problem = await this.problemRepository.updateProblem(id, updateData);
    return problem;
  }
}

module.exports = ProblemService;
