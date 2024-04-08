require("dotenv").config();// Load environment variables from .env file into process.env
const express = require("express");
const app = express();
const cors = require("cors");// Import the CORS middleware for enabling Cross-Origin Resource Sharing
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");


// database connection
mongoose.connect('mongodb://127.0.0.1:27017/project')

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
