import React from 'react';
import Dish from '../../components/Dish/Dish';

export default function ResultsPage({ results, searchTerm, setMealResult }) {
    return (
        <section className='results-section'>
            <h1 className='results-h1'>Results for {searchTerm}</h1>
            { results ?
                <div className='results-div'>
                    {results.map((meal) =>                 
                        <Dish key={meal.idMeal} dish={meal} id={meal.idMeal} setMealResult={setMealResult}/>
                    )}
                </div>
                : "Your search had no results"
            }
        </section>
    )
}