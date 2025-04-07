/**
 * Mongoose schema for recipe reviews.
 * Defines the structure and validation rules for review documents in MongoDB.
 */
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    // ID of the recipe being reviewed
    recipeId: { type: String, required: true },
    
    // Name of the user who submitted the review
    userName: { type: String, required: true },
    
    // Email of the user who submitted the review
    userEmail: { type: String, required: true },
    
    // Rating value (1-5 stars)
    rating: { 
        type: Number, 
        required: true, 
        min: 1,  // Minimum rating value
        max: 5   // Maximum rating value
    },
    
    // Text content of the review
    comment: { type: String },
    
    // Timestamp of when the review was created
    createdAt: { 
        type: Date, 
        default: Date.now // Automatically set to current date/time
    },
});

// Create and export the Review model
module.exports = mongoose.model("Review", reviewSchema);