const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // in mongoose 11000 means duplicate error key
  if (err.code === 11000) {
    const message = ` Duplicate Field Value Enter`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
  // Call the next middleware
  next(); // Make sure to call next() here
};

module.exports = errorHandler;
