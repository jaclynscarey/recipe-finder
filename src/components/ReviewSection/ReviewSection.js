import React, { useEffect, useState } from "react";
import reviewsData from "../../data/reviews.json";
import "./ReviewSection.css";

export default function ReviewSection({ recipeId }) {
    const [reviews, setReviews] = useState([]);
    const [sortOption, setSortOption] = useState('date-desc');

    useEffect(() => {
        const filtered = reviewsData.filter((review) => review.id === recipeId);
        setReviews(filtered);
    }, [recipeId]);

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortOption === 'date-desc') {
            return new Date(b.date) - new Date(a.date);
        } else if (sortOption === 'date-asc') {
            return new Date(a.date) - new Date(b.date);
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
                                <p><strong>{review.user}</strong> ({review.date})</p>
                                <p className="review-rating">{'⭐'.repeat(review.rating)}</p>
                                <p className="review-comment">{review.comment}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}