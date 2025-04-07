/**
 * RecipePage component that displays detailed information about a specific recipe.
 * Includes ingredients, instructions, video tutorial, and user reviews.
 */
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import ReviewSection from "../../components/ReviewSection/ReviewSection";
import { useParams } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

export default function RecipePage({ mealResult: initialMealResult, user, onLoginSuccess }) {
    // Get recipe ID from URL parameters
    const { id } = useParams();
    
    // State management for recipe data and loading status
    const [mealResult, setMealResult] = useState(initialMealResult);
    const [loading, setLoading] = useState(!initialMealResult);

    /**
     * Effect hook to fetch recipe data if not provided as prop
     * Used when accessing recipe directly via URL or on page refresh
     */
    useEffect(() => {
        async function fetchRecipe() {
            if (!mealResult && id) {
                try {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                    const data = await response.json();
                    if (data.meals && data.meals[0]) {
                        setMealResult(data.meals[0]);
                    }
                } catch (error) {
                    console.error('Error fetching recipe:', error);
                } finally {
                    setLoading(false);
                }
            }
        }

        fetchRecipe();
    }, [id, mealResult]);

    /**
     * Handles Google OAuth login errors
     */
    const handleLoginError = () => {
        console.error('Login Failed');
    };

    // Loading state display
    if (loading) {
        return (
            <div className="hourglass-div">
                <img className="hourglass" src={`${process.env.PUBLIC_URL}/hourglass.png`} alt="hourglass" />
            </div>
        );
    }

    // Error state display
    if (!mealResult) {
        return <div>Recipe not found</div>;
    }

    // Extract recipe data
    const videoUrl = mealResult["strYoutube"];
    const videoId = videoUrl.split("=")[1];
    const ingredients = Object.keys(mealResult).filter(key => key.startsWith("strIngredient")).map(key => mealResult[key]);
    const measures = Object.keys(mealResult).filter(key => key.startsWith("strMeasure")).map(key => mealResult[key]);

    return (
        <section className="recipe-section">
            {/* Recipe header with title and metadata */}
            <div className="recipe-div">
                <h1 className="recipe-h1">{mealResult.strMeal}</h1>
                <span className="recipe-span">Nationality: {mealResult.strArea} | Category: {mealResult.strCategory}</span>            
            </div>

            {/* Recipe image */}
            <img className="recipe-img" src={mealResult.strMealThumb} alt={mealResult.strMeal} />

            {/* Ingredients table */}
            <table>
                <thead>
                    <tr>
                        <th colSpan='2'>Ingredients</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((ingredient, index) => (
                        <tr key={index}>
                            <td className="measure">{measures[index]}</td>
                            <td className="ingredient">{ingredient}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Cooking instructions */}
            <p className="recipe-instructions">{mealResult.strInstructions}</p>                   

            {/* Video tutorial section */}
            <div className="video-div">
                <YouTube videoId={videoId} />
            </div>

            {/* User reviews section */}
            <div className="review-div">
                <h2>User Reviews</h2>
                {user ? (
                    // Show reviews for logged-in users
                    <ReviewSection recipeId={mealResult.idMeal} />
                ) : (
                    // Show login prompt for guests
                    <div className="login-prompt">
                        <p>Please login to view the reviews.</p>
                        <GoogleLogin
                            onSuccess={onLoginSuccess}
                            onError={handleLoginError}
                            useOneTap
                            render={({ onClick }) => (
                                <button onClick={onClick} className="google-login-btn">
                                    <img src={`${process.env.PUBLIC_URL}/google.png`} alt="Google" />
                                    <span>Login</span>
                                </button>
                            )}
                        />
                    </div>
                )}
            </div>       
        </section>
    );
}