import { Request, Response } from "express";
import { submissionSchemaType } from "../zod/submission.schema";

async function addSubmission(req: Request, res: Response) {
   const submission = req.body as submissionSchemaType;

   return res.status(201).json({
      success: true,
      error: {},
      message: "successfully collected the submission",
      data: submission,
   });
}

export { addSubmission };
