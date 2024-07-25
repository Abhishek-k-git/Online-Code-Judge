const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title cannot be empty"],
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, "Description cannot be empty"],
    trim: true,
    maxlength: 1000,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: [true, "Difficulty cannot be empty"],
    default: "easy",
  },
  testCases: [
    {
      input: {
        type: String,
        required: [true, "Test case input cannot be empty"],
      },
      output: {
        type: String,
        required: [true, "Test case output cannot be empty"],
      },
    },
  ],
  codeStubs: [
    {
      language: {
        type: String,
        enum: ["CPP", "JAVA", "PYTHON"],
        required: [true, "language cannot be empty"],
      },
      startSnippet: {
        type: String,
      },
      endSnippet: {
        type: String,
      },
      userSnippet: {
        type: String,
      },
    },
  ],
  editorial: {
    type: String,
    trim: true,
    maxlength: 2000,
  },
});

const Problem = mongoose.model("Problems", problemSchema);
module.exports = Problem;
