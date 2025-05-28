export const errorHandler = (err, _, res, __) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal server error",
    stack: err.stack,
    errors: err.errors
  });
};
