const { Problem } = require("../models/index.js");
const NotFound = require("../errors/NotFound.js");
const logger = require("../config/logger.config");

class ProblemRepository {
  async createProblem(data) {
    try {
      const problemData = {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        testCases: data.testCases,
        codeStubs: data.codeStubs,
      };
      if (data.editorial) {
        problemData.editorial = data.editorial;
      }

      const problem = await Problem.create(problemData);
      return problem;
    } catch (error) {
      logger.error(`ProblemRepository.js: could not create a new problem`);
      throw error;
    }
  }

  async getProblem(id) {
    try {
      const problem = await Problem.findById(id);
      if (!problem) {
        throw new NotFound("get problem", id);
      }
      return problem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllProblems() {
    try {
      const problems = await Problem.find({});
      if (!problems) {
        throw new NotFound("get all problems", null);
      }
      return problems;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteProblem(id) {
    try {
      const deletedProblem = await Problem.findByIdAndDelete(id);
      if (!deletedProblem) {
        logger.error(
          `ProblemRepository.js: problem with id: ${id} not found in the db`
        );
        throw new NotFound("delete problem", id);
      }
      return deletedProblem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateProblem(id, updateData) {
    try {
      const updatedProblem = await Problem.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      if (!updatedProblem) {
        throw new NotFound("update problem", id);
      }
      return updatedProblem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = ProblemRepository;
