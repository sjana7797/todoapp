import type { NextFunction, Request, Response } from "express";
import { globalResponseCreator } from "../utils/response";

export class ErrorHandler extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  if (error instanceof ErrorHandler) {
    return res
      .status(error.statusCode ?? 500)
      .json(
        globalResponseCreator(
          null,
          error.message ?? "Internal Server Error",
          404,
          error
        )
      );
  }
  return res
    .status(500)
    .json(globalResponseCreator(null, "Internal Server Error", 500, error));
};
