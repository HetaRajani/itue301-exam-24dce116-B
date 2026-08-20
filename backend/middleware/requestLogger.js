// requestLogger.js
// Custom middleware that logs every incoming request in the format:
// [METHOD] [PATH] [TIMESTAMP]
// Example: [GET] /api/v1/borrowings [2026-08-20T10:15:20.000Z]

function requestLogger(req, res, next) {
  const method = req.method;
  const path = req.originalUrl;
  const timestamp = new Date().toISOString();

  console.log(`[${method}] [${path}] [${timestamp}]`);

  next();
}

module.exports = requestLogger;
