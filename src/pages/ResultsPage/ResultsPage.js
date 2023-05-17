import React from 'react';
import Dish from '../../components/Dish/Dish';

export default function ResultsPage({ results, searchTerm }) {
    return (
        <section>
            <h1>Results for {searchTerm}</h1>
            { results ?
                <div className='dish-container'>
                    {results.map((meal) => 
                        <Dish key={meal.idMeal} dish={meal}/>
                    )}
                </div>
                : "Your search had no results"
            }
        </section>
    )
}