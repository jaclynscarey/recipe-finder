/**
 * ResultsPage component that displays search results from TheMealDB API.
 * Shows a grid of recipe cards that users can click to view detailed information.
 */
import React from 'react';
import Dish from '../../components/Dish/Dish';

export default function ResultsPage({ results, searchTerm, setMealResult }) {
    return (
        <section className='results-section'>
            {/* Search results header */}
            <h1 className='results-h1'>Results for {searchTerm}</h1>
            
            {/* Conditional rendering of results */}
            { results ? (
                // Display grid of recipe cards if results exist
                <div className='results-div'>
                    {results.map((meal) =>                 
                        <Dish 
                            key={meal.idMeal} 
                            dish={meal} 
                            id={meal.idMeal} 
                            setMealResult={setMealResult}
                        />
                    )}
                </div>
            ) : (
                // Show message if no results found
                <h1>Your search had no results</h1>
            )}
        </section>
    );
}