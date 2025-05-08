class ApiError extends Error {
  constructor(statusCode = 500, message = "Failure", errors = [], stack = "") {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
