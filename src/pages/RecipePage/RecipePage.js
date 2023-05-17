import React from "react";
import YouTube from "react-youtube";


export default function RecipePage({ mealResult }) {
    console.log(mealResult)


    return (
        <section>
            <h1>{mealResult.strMeal}</h1>
            <img src={mealResult.strMealThumb} alt={mealResult.strMeal} />
            
            <div>
                <YouTube videoId="IO0issT0Rmc" />
            </div>

        </section>
    )
}