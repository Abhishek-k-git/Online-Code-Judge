# Evaluation Service

This service implements an online code judge service using Node.js, Express.js, BullMQ, Dockerode, ioredis, Zod, and TypeScript. It provides a RESTful API for evaluating code submissions in various programming languages (cpp, java, python). Jobs are managed asynchronously using BullMQ, with Docker containers dynamically provisioned for secure code execution. Zod ensures schema validation for incoming data, enhancing reliability and security. Real-time monitoring of job queues is facilitated through BullMQ Dashboard integration.

```bash
- package.json: Configuration file listing dependencies and scripts.
- src/
  └── config/: Configuration files (server configuration, redis configuation, BullBoard configuration).
  └── containers/: Docker container management utilities.
  └── controllers/: Express.js controllers (submission controller).
  └── jobs/: BullMQ job definitions (SubmissionJob).
  └── producers/: Job producers for adding tasks to queues (submission, evaluation).
  └── queues/: BullMQ queue definitions (SubmissionQueue, EvaluationQueue).
  └── routes/: Express.js route definitions
  └── types/: TypeScript type definitions (e.g., ExecuteResType, SubmissionPayloadType).
  └── utils/: Utility functions and helpers (executer util, constants, code creator).
  └── validators/: Data validation schemas (zod validation schema).
  └── workers/: BullMQ worker definitions (e.g., submission worker).
  └── zod/: Zod schema definitions for data validation.
  └── index.ts: Main entry point of the application.
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

1. **Web API with Express.js**

   - **RESTful Architecture:** Utilizes Express.js to build a robust API following REST principles.
   - **Middleware Support:** Handles request parsing and error handling middleware (`express.urlencoded`, `express.json`, `express.text`).

2. **Job Processing with BullMQ**

   - **Job Queue Management:** Uses BullMQ for asynchronous job processing (`SubmissionQueue`).
   - **Scalability:** Enables scalable job execution with multiple workers.

3. **Containerized Execution with Dockerode**

   - **Docker Integration:** Manages Docker containers for secure code execution.
   - **Dynamic Provisioning:** Pulls and runs Docker images based on language requirements (`RunJava` class).

4. **Schema Validation with Zod**

   - **Type Safety:** Validates incoming data structures (`submissionSchemaType`) with Zod.
   - **Error Handling:** Ensures data consistency and prevents malformed payloads.

5. **TypeScript for Type Safety and Maintainability**
   - **Static Typing:** Ensures type safety and enhances code maintainability.
   - **Interfaces and Types:** Defines TypeScript interfaces and types (`JobInterface`, `ExecuteResType`).

## Technologies Used

- **Node.js**: Runtime environment for server-side JavaScript.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Docker**: Containerization platform used for sandboxing code execution.
- **Redis**: In-memory data structure store, used for caching and queuing tasks.
- **MongoDB**: Document database used for storing submissions and evaluation results.
- **BullMQ**: Queueing library for handling asynchronous tasks like submission processing.
- **Dockerode**: Docker API client for Node.js, used for managing Docker containers programmatically.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- Docker installed on your machine.
- Redis server running locally or accessible.

### Installation

1. Clone the repository:

   ```bash
   git clone
   cd Evaluation-Service
   ```

   Install dependencies:

   ```bash
   Copy code
   npm install
   ```

### Configuration

Create a `.env` file in the root directory with the following configurations:

```bash
PORT=5000
REDIS_HOST=localhost
REDIS_PORT=6379
MONGODB_URI=mongodb://localhost:27017/algocode
# Add other configuration variables as needed
```

## Usage

Start the server:

```bash
npm start
```

## API Endpoints

- POST /submission/: Submit a code for evaluation
