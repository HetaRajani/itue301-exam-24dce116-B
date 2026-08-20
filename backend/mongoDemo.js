// mongoDemo.js
// Task 5 demonstration script.
// Run with: npm run seed:mongo   (or) node mongoDemo.js
//
// This script:
//   1. Connects to MongoDB via Mongoose.
//   2. Creates a Book, a Member, and a Borrowing (valid documents) to prove
//      the schemas and references work.
//   3. Attempts to create an INVALID Borrowing (missing bookId + bad status)
//      to demonstrate a validation failure, and prints a clean JSON error
//      response instead of the raw Mongoose error object.

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Book = require("./models/Book");
const Member = require("./models/Member");
const Borrowing = require("./models/Borrowing");
const formatMongooseError = require("./utils/formatMongooseError");

async function run() {
  await connectDB();

  try {
    console.log("\n--- 1. Creating a valid Book ---");
    const book = await Book.create({
      title: "You Don't Know JS",
      author: "Kyle Simpson",
      category: "Web Development",
      isbn: `978-demo-${Date.now()}`, // unique each run so re-seeding never collides
      available: true,
    });
    console.log("Created book:", book._id.toString());

    console.log("\n--- 2. Creating a valid Member ---");
    const member = await Member.create({
      name: "Priya Patel",
      email: `priya.patel.${Date.now()}@example.com`,
      phone: "9876543210",
      department: "Information Technology",
    });
    console.log("Created member:", member._id.toString());

    console.log("\n--- 3. Creating a valid Borrowing (references Book + Member) ---");
    const borrowing = await Borrowing.create({
      memberId: member._id,
      bookId: book._id,
      borrowDate: new Date(),
      returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      // status omitted on purpose -> should default to "borrowed"
    });
    console.log("Created borrowing:", borrowing._id.toString(), "| status:", borrowing.status);

    console.log("\n--- 4. Fetching the borrowing back with populated references ---");
    const populated = await Borrowing.findById(borrowing._id)
      .populate("memberId", "name email")
      .populate("bookId", "title author");
    console.log(JSON.stringify(populated, null, 2));

    console.log("\n--- 5. Demonstrating a VALIDATION FAILURE ---");
    console.log("Attempting to create a Borrowing with a missing bookId and an invalid status...");
    try {
      await Borrowing.create({
        memberId: member._id,
        // bookId intentionally missing
        borrowDate: new Date(),
        returnDate: new Date(),
        status: "lost", // not in the allowed enum
      });
    } catch (validationErr) {
      const cleanError = formatMongooseError(validationErr);
      console.log("Meaningful JSON error response returned to the client:");
      console.log(JSON.stringify(cleanError, null, 2));
    }

    console.log("\n--- 6. Demonstrating a DUPLICATE KEY validation failure (unique email) ---");
    try {
      await Member.create({
        name: "Duplicate Test",
        email: member.email, // same email as an existing member -> violates unique constraint
        department: "Computer Engineering",
      });
    } catch (dupErr) {
      const cleanError = formatMongooseError(dupErr);
      console.log("Meaningful JSON error response returned to the client:");
      console.log(JSON.stringify(cleanError, null, 2));
    }
  } catch (err) {
    console.error("Unexpected error while running the demo:", err);
  } finally {
    await mongoose.connection.close();
    console.log("\nMongoDB connection closed.");
  }
}

run();
