const { PROBLEM_SERVICE_BASE_URL } = require("../config/server.config.js");
const axios = require("axios");
const axiosInstance = axios.create();

async function getProblemDetails(problemId) {
  try {
    const uri = `${PROBLEM_SERVICE_BASE_URL}/api/v1/problems/${problemId}`;
    const response = await axiosInstance.get(uri);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = getProblemDetails;
