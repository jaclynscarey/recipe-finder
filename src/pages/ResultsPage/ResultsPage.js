import React, { useState } from 'react';
import Dish from '../../components/Dish/Dish';

export default function ResultsPage({ results, searchTerm, setMealResult }) {
    const [id, setId] = useState(null);
    return (
        <section>
            <h1>Results for {searchTerm}</h1>
            { results ?
                <div className='dish-container'>
                    {results.map((meal) =>                 
                        <Dish key={meal.idMeal} dish={meal} id={meal.idMeal} setMealResult={setMealResult}/>
                    )}
                </div>
                : "Your search had no results"
            }
        </section>
    )
}