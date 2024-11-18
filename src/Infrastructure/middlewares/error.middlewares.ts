import { NextFunction, Request, Response } from "express";
import HttpError from "../errors/http-error";
import { ValidationError } from "yup";

const ErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ status: error.statusCode, error: error.message });
  } else if (error instanceof ValidationError) {
    const validationErrors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    return res.status(400).json({ status: 400, error: validationErrors });
  }

  console.log("Error: ", error);
  return res.status(500).json({ status: 500, message: "Internal server error" });
};

export default ErrorMiddleware;
