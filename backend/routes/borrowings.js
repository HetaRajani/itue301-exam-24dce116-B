// routes/borrowings.js
const express = require("express");
const router = express.Router();
const borrowings = require("../data/borrowings");

const VALID_STATUSES = ["borrowed", "returned", "overdue"];

// GET /api/v1/borrowings -> Return all borrowing records
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: borrowings.length,
    data: borrowings,
  });
});

// POST /api/v1/borrowings -> Create a new borrowing record
router.post("/", (req, res, next) => {
  try {
    const { memberName, bookTitle, borrowDate, returnDate, status } = req.body;

    if (!memberName || !bookTitle || !borrowDate || !returnDate) {
      return res.status(400).json({
        success: false,
        error: {
          message:
            "memberName, bookTitle, borrowDate and returnDate are all required.",
          status: 400,
        },
      });
    }

    const finalStatus = status && VALID_STATUSES.includes(status) ? status : "borrowed";

    const newBorrowing = {
      id: "br" + (borrowings.length + 1) + "_" + Date.now(),
      memberName,
      bookTitle,
      borrowDate,
      returnDate,
      status: finalStatus,
    };

    borrowings.push(newBorrowing);

    res.status(201).json({
      success: true,
      data: newBorrowing,
    });
  } catch (err) {
    // Forwarded to the global error handler
    next(err);
  }
});

module.exports = router;
