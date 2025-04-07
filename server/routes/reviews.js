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

// Update a review
router.put("/:id", async (req, res) => {
    try {
        console.log("Update data:", req.body);
        
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        
        if (!updatedReview) {
            console.log("No review found with ID:", req.params.id);
            return res.status(404).json({ error: "Review not found" });
        }
        
        console.log("Updated review:", updatedReview);
        res.json(updatedReview);
    } catch (err) {
        console.error("Error updating review:", err);
        res.status(500).json({ error: err.message });
    }
});

// Delete a review
router.delete("/:id", async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        console.log("Delete result:", deletedReview);
        
        if (!deletedReview) {
            console.log("No review found with ID:", req.params.id);
            return res.status(404).json({ error: "Review not found" });
        }
        
        // Verify the review was actually deleted
        const verifyDeletion = await Review.findById(req.params.id);
        if (verifyDeletion) {
            console.log("Review still exists after deletion attempt!");
            return res.status(500).json({ error: "Failed to delete review" });
        }
        
        res.json({ message: "Review deleted successfully" });
    } catch (err) {
        console.error("Error deleting review:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;