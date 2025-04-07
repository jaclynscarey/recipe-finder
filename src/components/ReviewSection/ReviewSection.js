import React, { useEffect, useState, useCallback } from "react";
import "./ReviewSection.css";

export default function ReviewSection({ recipeId }) {
    const [reviews, setReviews] = useState([]);
    const [sortOption, setSortOption] = useState('date-desc');
    const REACT_APP = process.env.REACT_APP_API_URL || "http://localhost:5001";

    useEffect(() => {
        async function fetchReviews() {
            if (!recipeId) {
                console.warn("No recipeId provided to fetch reviews.");
                return;
            }
            console.log("Fetching reviews for recipeId:", recipeId);
            try {
                const res = await fetch(`${REACT_APP}/api/reviews/${recipeId}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.statusText}`);
                }
                const data = await res.json();
                console.log("Fetched reviews:", data);
                if (data && data.length > 0) {
                    setReviews(data);
                } else {
                    console.warn("No reviews found for this recipe.");
                }
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        }

        fetchReviews();
    }, [recipeId, REACT_APP]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const form = e.target;
        const userStr = localStorage.getItem("user");

        if (!userStr) {
            alert("You must be logged in to submit a review.");
            return;
        }

        const user = JSON.parse(userStr);
        const newReview = {
            recipeId,
            userName: user.name,
            userEmail: user.email,
            rating: form.rating.value,
            comment: form.comment.value,
        };

        console.log("Submitting new review:", newReview);

        try {
            const res = await fetch(`${REACT_APP}/api/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReview),
            });
            
            if (!res.ok) {
                throw new Error(`Failed to submit review: ${res.statusText}`);
            }
            
            const savedReview = await res.json();
            console.log("Response from submitting review:", savedReview);
            setReviews(prevReviews => [savedReview, ...prevReviews]);
            form.reset();
        } catch (err) {
            console.error("Error submitting review:", err);
            alert(`Failed to submit review: ${err.message}`);
        }
    }, [recipeId, REACT_APP]);

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortOption === 'date-desc') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortOption === 'date-asc') {
            return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (sortOption === 'rating-desc') {
            return b.rating - a.rating;
        } else if (sortOption === 'rating-asc') {
            return a.rating - b.rating;
        } else {
            return 0;
        }
    });

    if (!recipeId) return null;

    return (
        <div>
            {reviews.length === 0 ? (
                <p>No reviews yet for this recipe.</p>
            ) : (
                <>
                    <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="date-desc">Date (Newest First)</option>
                        <option value="date-asc">Date (Oldest First)</option>
                        <option value="rating-desc">Rating (High to Low)</option>
                        <option value="rating-asc">Rating (Low to High)</option>
                    </select>
                    <ul className="review-list">
                        {sortedReviews.map((review, index) => (
                            <li key={index} className="review">
                                <p><strong>{review.userName}</strong></p>
                                <p className="review-rating">{'⭐'.repeat(review.rating)}</p>
                                <p className="review-comment">{review.comment}</p>
                                <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {localStorage.getItem("user") && (
                <form
                    className="review-form"
                    onSubmit={handleSubmit}
                >
                    <h3>Add Your Review</h3>
                    <select name="rating" required>
                        <option value="">Rating</option>
                        {[5, 4, 3, 2, 1].map((r) => (
                            <option key={r} value={r}>
                                {r} ⭐
                            </option>
                        ))}
                    </select>
                    <textarea name="comment" placeholder="Write your thoughts..." required />
                    <button type="submit">Submit Review</button>
                </form>
            )}
        </div>
    );
}