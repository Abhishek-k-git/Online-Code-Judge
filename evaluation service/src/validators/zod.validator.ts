import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

const validate =
  <T>(schema: ZodSchema<T>) =>
      (req: Request, res: Response, next: NextFunction) => {
         try {
            schema.parse({
               ...req.body,
            });

            next();
         } catch (error: unknown) {
            if (error instanceof ZodError) {
               console.error("Validation error:", error);
               return res.status(400).json({
                  success: false,
                  message: "Invalid request params received",
                  data: {},
                  error: error.errors,
               });
            }

            console.error("Unknown error during validation:", error);
            return res.status(500).json({
               success: false,
               message: "Internal server error",
               data: {},
               error: "Internal server error",
            });
         }
      };

export default validate;
