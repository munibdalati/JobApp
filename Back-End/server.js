require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const applicationRoutes = require("./routes/applicationRoutes");
const vacancyRoutes = require("./routes/vacancyRoutes");

const cors = require("cors");

// express app
const app = express();

// Configure CORS
app.use(cors());

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use("/api/application", applicationRoutes);
app.use("/api/vacancy", vacancyRoutes);


// Port
const PORT = 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
