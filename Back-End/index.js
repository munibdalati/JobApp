require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const applicationRoutes = require("./routes/applicationRoutes");
const vacancyRoutes = require("./routes/vacancyRoutes");

const cors = require("cors");
// const path = require("path");



// express app
const app = express();

// Configure CORS
app.use(cors(
  {
    origin:['https://deploy-mern-1whq.vercel.app'],
    methods:['GET', 'POST'],
    credentials:true
  }
));

// Connect DB
connectDB();

// Middleware
app.use(express.json());
// app.use(express.static(path.join(__dirname + "/public")));

// Routes
// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use("/api/application", applicationRoutes);
app.use("/api/vacancy", vacancyRoutes);


// Port
const PORT = 8000 || process.env.PORT;

const server = app.listen(PORT , () =>
  console.log(`Server running on port ${PORT}`)
);
