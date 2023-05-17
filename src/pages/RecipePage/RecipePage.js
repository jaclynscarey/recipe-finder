import React from "react";
import YouTube from "react-youtube";


export default function RecipePage({ mealResult }) {
    const videoUrl = mealResult["strYoutube"];
    const videoId = videoUrl.split("=")[1];

    const ingredients = Object.keys(mealResult).filter(key => key.startsWith("strIngredient")).map(key => mealResult[key]);
    
    const measures = Object.keys(mealResult).filter(key => key.startsWith("strMeasure")).map(key => mealResult[key]);

    return (
        <section>
            <h1>{mealResult.strMeal}</h1>
            <img src={mealResult.strMealThumb} alt={mealResult.strMeal} />
            <p>{mealResult.strInstructions}</p>
            <ul>
                {ingredients.map(ingredient =>
                <li>{ingredient}</li>                   
                )}
            </ul>
            
            <div>
                <YouTube videoId={videoId} />
            </div>

        </section>
    )
}