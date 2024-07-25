# Submission Service (Nodejs, Fastify, MongoDB)

The Submission Service is a microservice designed to handle the submission of solutions, adding them to a queue for processing. It provides a RESTful API interface for submitting solutions.

```bash
- apis
  └── problems.api.js           # function to get the problem detail from problem api

- config/
  ├── db.config.js              # Configuration for database connection (MongoDB)
  ├── logger.config.js          # Configuration for logging (using Winston)
  ├── redis.config.js           # Configuration for redis client using ioredis
  └── server.config.js          # Configuration loader (loads environment variables, etc.)

- controllers/
  └── submission.controller.js  # Controllers for handling operation on submission

- errors/
  └── ...                       # Custom error classes

- models/
  └── submission.model.js       # Mongoose schema and model definition for submission

- producers/
  └── submission.queue.js       # Add submission job into the queue

- queues/
  └── submission.queue.js       # Implementation of queue using bullmq

- repositories/
  └── SubmissionRepository.js   # Repository pattern for interacting with submission in database

- routes/
  ├── v1/
    └── submission.routes.js    # Fastify routes for problems API endpoints

- services/
  └── SubmissionService.js      # Business logic layer for submission, interacts with repositories

- utils/
  └── errorHandler.js           # Utility functions for error handling and logging

- .env                          # Environment variables configuration file (not included in the repo)
- app.js                        # Required registratins of services, repositories etc, as fastify-plugin
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

- Submit a solution to be processed asynchronously.
- Integration with BullMQ for queueing and processing submissions.
- Intergration with other servies such as problem service, evaluation service etc.
- Custom Error handling classes and logging with Winston.
- CORS support with @fastify/cors plugin.
- Environment configuration using dotenv.
- Integration with MongoDB for logging and submission data.

## Technologies Used

- **Node.js**: Runtime environment for server-side JavaScript.
- **Fastify**: Fast and low overhead web framework for Node.js.
- **@fastify/cors**: Fastify plugin for enabling Cross-Origin Resource Sharing (CORS).
- **axios**: Promise-based HTTP client for making requests to other services.
- **BullMQ**: Queueing library for handling asynchronous tasks like submission processing.
- **dotenv**: Module that loads environment variables from a `.env` file into `process.env`.
- **http-status-codes**: Utility library for HTTP status codes.
- **ioredis**: Redis client library for Node.js, used for BullMQ queue management.
- **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **winston**: Logging library for Node.js, providing a flexible and universal logging mechanism.
- **winston-mongodb**: Winston transport for MongoDB, allowing logging directly to MongoDB.

## Getting Started

### Prerequisites

- Knowledge of JavaScript (Node.js, Fastify, MongoDB)
- Node.js (version 18.0.0 or higher)
- Redis server (local or hosted) for BullMQ queue management

### Installation

1. Clone the repository:
   ```bash
    git clone https://github.com/your/repository.git
    cd "submission service"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

```bash
# .env configurations
PORT=4000
MONGODB_URL=mongodb://localhost:27017/submissions
NODE_ENV=development
PROBLEM_SERVICE_BASE_URL=http://localhost/3000
REDIS_PORT=6379,
REDIS_HOST=127.0.0.1
# Add other configuration variables as needed
```

## Usage

```bash
npm start
```

## API Endpoints

- POST /submission : Create/Add a new submission.
- GET /submission/:userId : Get all previous submissions of the user.
