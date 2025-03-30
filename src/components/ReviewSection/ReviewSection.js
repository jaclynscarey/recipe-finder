import { useEffect, useState } from "react";
import reviewsData from "../../data/reviews.json";
import "./ReviewSection.css";
export default function ReviewSection({ recipeId }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const filtered = reviewsData.filter((review) => review.id === recipeId);
        setReviews(filtered);
    }, [recipeId]);

    if (!recipeId) return null;

    return (
        <div className="review-div">
            {reviews.length === 0 ? (
                <p>No reviews yet for this recipe.</p>
            ) : (
                <ul className="review-list">
            {reviews.map((review, index) => (
                <li key={index} className="review-item">
                <div className="review-meta">
                    <strong>{review.user}</strong> — {review.date}
                </div>
                <div className="review-rating">Rating: {review.rating}/5</div>
                <p className="review-comment">{review.comment}</p>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    );
}