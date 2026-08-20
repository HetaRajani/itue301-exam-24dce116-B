// utils/formatMongooseError.js
// Converts a raw Mongoose ValidationError (or duplicate-key error) into a
// clean, meaningful JSON response instead of leaking the raw error object/stack.

function formatMongooseError(err) {
  // Mongoose validation error (missing required field, bad enum value, etc.)
  if (err.name === "ValidationError") {
    const fields = Object.keys(err.errors).map((field) => ({
      field,
      message: err.errors[field].message,
    }));

    return {
      success: false,
      error: {
        type: "ValidationError",
        message: "One or more fields failed validation.",
        fields,
      },
    };
  }

  // Duplicate key error (e.g. unique email or isbn already exists)
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue || {})[0];
    return {
      success: false,
      error: {
        type: "DuplicateKeyError",
        message: duplicateField
          ? `${duplicateField} must be unique. The value provided is already in use.`
          : "A unique field constraint was violated.",
      },
    };
  }

  // Fallback for any other error type
  return {
    success: false,
    error: {
      type: "ServerError",
      message: "An unexpected error occurred.",
    },
  };
}

module.exports = formatMongooseError;
