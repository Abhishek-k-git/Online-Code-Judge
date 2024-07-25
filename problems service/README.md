# Problems Service (MongoDB, Expressjs, MongoDB)

The Problems Service is a microservice designed to manage CREATION of a new problem, GET one or GET all problems, DELETE a problem and UPDATE a problem (CRUD). It provides a RESTful API interface for interacting with problem data

```bash
- config/
  ├── db.config.js              # Configuration for database connection (MongoDB)
  ├── logger.config.js          # Configuration for logging (using Winston)
  └── server.config.js          # Configuration loader (loads environment variables, etc.)

- controllers/
  └── problem.controller.js     # Controllers for handling CRUD operations on problems

- errors/
  └── ...                       # Custom error classes

- models/
  └── problem.model.js          # Mongoose schema and model definition for problems

- repositories/
  └── ProblemRepository.js      # Repository pattern for interacting with problems in database

- routes/
  ├── v1/
    └── problem.routes.js       # Express routes for problems API endpoints

- services/
  └── ProblemService.js         # Business logic layer for problems, interacts with repositories

- utils/
  ├── errorHandler.js           # Utility functions for error handling and logging
  └── markdownSanitizer.js      # Other utility functions for sanitization

- .env                          # Environment variables configuration file (not included in the repo)
- index.js                      # Entry point of the application, sets up Express server
- package.json                  # npm package configuration file
- README.md                     # Project documentation including setup instructions, API endpoints, etc.
```

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- Create, Read, and Delete operations for problems.
- Integration with other services such as submission queues, evaluation service, etc.
- Environment configuration using dotenv.
- Integration with MongoDB for logging and submission data.
- Custom Error handling classes and logging with Winston.
- Sanitization of data

## Technologies Used

- **Node.js**: Runtime environment for server-side JavaScript.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing problem and submission data.
- **Mongoose**: Object modeling tool for MongoDB.
- **dotenv**: Module that loads environment variables from a `.env` file into `process.env`.
- **http-status-codes**: Utility library for HTTP status codes.
- **marked**: A markdown parser and compiler for Node.js, used for rendering markdown content.
- **sanitize-html**: Library for cleaning HTML input, used for sanitizing user-generated content.
- **turndown**: HTML to Markdown converter, used for converting HTML content to Markdown format.
- **winston**: Logging library for Node.js, providing a flexible and universal logging mechanism.
- **winston-mongodb**: Winston transport for MongoDB, allowing logging directly to MongoDB.

## Getting Started

### Prerequisites

- Knowledge of JavaScript (MongoDB, Expressjs, Nodejs)
- Node.js (version 18.0.0 or higher)
- MongoDB & MongoDB Compass - GUI tool provided by MongoDB for interacting with MongoDB databases

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your/repository.git
   cd "problems service"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

```bash
# .env configurations
PORT=4000
MONGODB_URI=mongodb://localhost:27017/problems
# Add other configuration variables as needed
```

## Usage

```bash
npm start
```

## API Endpoints

- GET /problems : Retrieve all problems.
- GET /problems/:id : Retrieve a specific problem by id.
- POST /problems : Create a new problem.
- DELETE /problems/:id : Delete a specific problem by id.
- PATCH /problems/:id : Update a problem by problem id.
- Ping : check the server status online/offline
