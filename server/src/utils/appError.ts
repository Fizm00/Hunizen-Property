import { CustomError } from '../middlewares/errorMiddleware.js';

export class AppError extends Error implements CustomError {
  public statusCode: number;
  public errors?: Record<string, string> | unknown;

  constructor(message: string, statusCode: number, errors?: Record<string, string> | unknown) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    // Set the prototype explicitly for extending built-in Error in ES5/ES6
    Object.setPrototypeOf(this, AppError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}
