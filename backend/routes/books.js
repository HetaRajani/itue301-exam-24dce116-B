// routes/books.js
const express = require("express");
const router = express.Router();
const books = require("../data/books");

// GET /api/v1/books -> Return all books
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
});

module.exports = router;
