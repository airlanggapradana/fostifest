import {Request, Response, NextFunction} from "express";
import {ZodError} from "zod";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Invalid registration data",
      errors: err.issues,
    });
  }
  res.status(500).send({
    message: "Internal server error",
    error: err instanceof Error ? err.message : "Unknown error",
  });
}