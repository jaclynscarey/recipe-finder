import React from "react";
import YouTube from "react-youtube";


export default function RecipePage({ mealResult }) {
    const videoUrl = mealResult["strYoutube"];
    const videoId = videoUrl.split("=")[1];

    const ingredients = Object.keys(mealResult).filter(key => key.startsWith("strIngredient")).map(key => mealResult[key]);
    
    const measures = Object.keys(mealResult).filter(key => key.startsWith("strMeasure")).map(key => mealResult[key]);

    return (
        <section className="recipe-section">
            <h1 className="recipe-h1">{mealResult.strMeal}</h1>
            <img className="recipe-img" src={mealResult.strMealThumb} alt={mealResult.strMeal} />            
            <table>
                <thead>
                    <tr>
                        <th colSpan='2'>Ingredients</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((ingredient, index) => (
                        <tr>
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

        </section>
    )
}