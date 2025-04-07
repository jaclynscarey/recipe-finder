const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Get reviews for a specific recipe
router.get("/:recipeId", async (req, res) => {
    try {
        const reviews = await Review.find({ recipeId: req.params.recipeId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new review
router.post("/", async (req, res) => {
    const { recipeId, userName, userEmail, rating, comment } = req.body;
    try {
        const newReview = new Review({ recipeId, userName, userEmail, rating, comment });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;