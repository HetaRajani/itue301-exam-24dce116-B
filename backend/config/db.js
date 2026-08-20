// config/db.js
const mongoose = require("mongoose");

async function connectDB({ exitOnFailure = true } = {}) {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("MONGO_URI is not set. Please add it to your .env file.");
    if (exitOnFailure) process.exit(1);
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    if (exitOnFailure) process.exit(1);
  }
}

module.exports = connectDB;