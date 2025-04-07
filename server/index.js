const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const reviewRoutes = require("./routes/reviews");

const app = express();
const allowedOrigins = ["http://localhost:3000", "https://recipe-finder-enhancement3.netlify.app"];

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}));
app.use(express.json());

// Routes
app.use("/api/reviews", reviewRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});