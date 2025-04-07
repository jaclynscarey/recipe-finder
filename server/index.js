// Import required Node.js modules and packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import route handlers
const reviewRoutes = require("./routes/reviews");

// Initialize Express application
const app = express();

// Define allowed origins for CORS (Cross-Origin Resource Sharing)
// This specifies which domains are allowed to access the API
const allowedOrigins = ["http://localhost:3000", "https://recipe-finder-enhancement3.netlify.app", "https://recipe-finder.jaclyncarey.com", "https://recipe-finder-original.netlify.app"];

// Configure middleware
// CORS middleware with custom origin validation
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests from specified origins or when origin is undefined (same-origin requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}));
// Parse incoming JSON requests
app.use(express.json());

// Define API routes
// All review-related routes will be prefixed with /api/reviews
app.use("/api/reviews", reviewRoutes);

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
    // Log successful database connection
    // console.log("Connected to MongoDB");
    // Start the Express server
    app.listen(process.env.PORT, () => {
        // console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    // Log any database connection errors
    // console.error("MongoDB connection error:", error);
});