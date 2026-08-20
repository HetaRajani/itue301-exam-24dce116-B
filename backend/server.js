// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

const booksRouter = require("./routes/books");
const borrowingsRouter = require("./routes/borrowings");

const app = express();
const PORT = process.env.PORT || 5000;

// --- Core middleware ---
app.use(cors());
app.use(express.json());
app.use(requestLogger); // custom logger, applied globally

// --- Health check ---
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Library Book Management System API is running.",
  });
});

// --- Routes ---
app.use("/api/v1/books", booksRouter);
app.use("/api/v1/borrowings", borrowingsRouter);

// --- 404 handler for unknown routes ---
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.originalUrl} not found.`,
      status: 404,
    },
  });
});

// --- Global error-handling middleware (must be LAST) ---
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
