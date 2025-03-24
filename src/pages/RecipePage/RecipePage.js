import React from "react";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";

export default function RecipePage({ mealResult }) {
    const videoUrl = mealResult["strYoutube"];
    const videoId = videoUrl.split("=")[1];
    const user = JSON.parse(localStorage.getItem('user'));

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
            {user ? (
                <div className="video-div">
                    <YouTube videoId={videoId} />
                </div>
            ) : (
                <div className="video-div login-prompt">
                    <p>Please <Link to="/">login</Link> to view the cooking video.</p>
                </div>
            )}
        </section>
    )
}