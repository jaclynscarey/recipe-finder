/**
 * ResultsPage component that displays search results from TheMealDB API.
 * Shows a grid of recipe cards that users can click to view detailed information.
 */

import React, { useState, useEffect } from 'react';
import Dish from '../../components/Dish/Dish';
import { useParams } from 'react-router-dom';

// API endpoint configuration for different search categories
const endpoint = {
    "Nationality": ["filter.php?a=", "list.php?a=list", "strArea"],
    "Ingredient": ["filter.php?i=", "list.php?i=list", "strIngredient"],
    "Name": ["search.php?s=", "search.php?s=", "strMeal"],
};

export default function ResultsPage({ results: initialResults, searchTerm: initialSearchTerm, setMealResult }) {
    const { category, searchTerm } = useParams();
    const [results, setResults] = useState(initialResults);
    const [loading, setLoading] = useState(!initialResults);

    /**
     * Effect hook to fetch results when page loads or refreshes
     * Uses search term from URL to fetch results from API
     */
    useEffect(() => {
        async function fetchResults() {
            if (!results && searchTerm) {
                try {
                    // Use appropriate endpoint based on category
                    const apiEndpoint = category ? endpoint[category][0] : endpoint["Name"][0];
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${apiEndpoint}${searchTerm}`);
                    const data = await response.json();
                    
                    if (data.meals) {
                        setResults(data.meals);
                    } else {
                        setResults(null);
                    }
                } catch (error) {
                    console.error('Error fetching results:', error);
                    setResults(null);
                } finally {
                    setLoading(false);
                }
            }
        }

        fetchResults();
    }, [searchTerm, results, category]);

    // Loading state display
    if (loading) {
        return (
            <div className="hourglass-div">
                <img className="hourglass" src={`${process.env.PUBLIC_URL}/hourglass.png`} alt="hourglass" />
            </div>
        );
    }

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