import { statusCodes } from "../constants/statusCodes.js";
class ApiError extends Error {
  constructor(
    statusCode = statusCodes.INTERNAL_SERVER_ERROR,
    message = "Failure",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = statusCode < 400;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
