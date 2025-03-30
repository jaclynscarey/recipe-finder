import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import ReviewSection from "../../components/ReviewSection/ReviewSection";
import { useParams } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

export default function RecipePage({ mealResult: initialMealResult, user, onLoginSuccess }) {
    const { id } = useParams();
    const [mealResult, setMealResult] = useState(initialMealResult);
    const [loading, setLoading] = useState(!initialMealResult);

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

    const handleLoginError = () => {
        console.error('Login Failed');
    };

    if (loading) {
        return (
            <div className="hourglass-div">
                <img className="hourglass" src={`${process.env.PUBLIC_URL}/hourglass.png`} alt="hourglass" />
            </div>
        );
    }

    if (!mealResult) {
        return <div>Recipe not found</div>;
    }

    const videoUrl = mealResult["strYoutube"];
    const videoId = videoUrl.split("=")[1];
    const ingredients = Object.keys(mealResult).filter(key => key.startsWith("strIngredient")).map(key => mealResult[key]);
    const measures = Object.keys(mealResult).filter(key => key.startsWith("strMeasure")).map(key => mealResult[key]);

    return (
        <section className="recipe-section">
            <div className="recipe-div">
                <h1 className="recipe-h1">{mealResult.strMeal}</h1>
                <span className="recipe-span">Nationality: {mealResult.strArea} | Category: {mealResult.strCategory}</span>            
            </div>
            <img className="recipe-img" src={mealResult.strMealThumb} alt={mealResult.strMeal} />
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
            <p className="recipe-instructions">{mealResult.strInstructions}</p>                   
            <div className="video-div">
                <YouTube videoId={videoId} />
            </div>
            <div className="review-div">
                <h2>User Reviews</h2>
                {user ? (
                    <ReviewSection recipeId={mealResult.idMeal} />
                ) : (
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