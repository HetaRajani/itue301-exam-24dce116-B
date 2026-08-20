// errorHandler.js
// Global error-handling middleware. Must be registered LAST, after all routes.
// Returns a structured JSON response instead of exposing the raw error stack.

function errorHandler(err, req, res, next) {
  console.error("Unhandled error:", err.message);

  const statusCode = err.statusCode && Number.isInteger(err.statusCode)
    ? err.statusCode
    : 500;

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.publicMessage || "Something went wrong on the server. Please try again later.",
      status: statusCode,
    },
  });
}

module.exports = errorHandler;
