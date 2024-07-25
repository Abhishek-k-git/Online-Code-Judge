import express from "express";

import { addSubmission } from "../../controllers/submission.controller";
import validate from "../../validators/zod.validator";
import { submissionSchema } from "../../zod/submission.schema";

const submissionRouter = express.Router();

submissionRouter.post("/", validate(submissionSchema), addSubmission);

export default submissionRouter;
