import { z } from "zod";

export const submissionSchema = z
   .object({
      userId: z.string(),
      problemId: z.string(),
      code: z.string(),
      language: z.string(),
   })
   .strict();

export type submissionSchemaType = z.infer<typeof submissionSchema>;
