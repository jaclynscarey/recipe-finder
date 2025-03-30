/**
 * Dish component that displays a recipe card in the search results.
 * Shows a thumbnail image and recipe name, and handles navigation to the detailed recipe view.
 */
import { useNavigate } from 'react-router-dom';
import './Dish.css';

export default function Dish({ dish, id, setMealResult }) {
    const navigate = useNavigate();

    /**
     * Handles click on recipe card
     * Fetches detailed recipe data and navigates to recipe page
     * @param {Event} event - Click event
     */
    async function handleClick(event) {
        event.preventDefault();

        try {
            // Fetch detailed recipe data from API
            const mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`) 
            const mealResults = await mealResponse.json();
            
            // Update global meal result state
            setMealResult(mealResults.meals[0])

            // Navigate to recipe detail page
            navigate(`/search/recipe/${id}`)
        
        } catch (error) {
            console.error('Error accessing this recipe.');
        }
    }

    return (
        <div onClick={handleClick} className="dish-div">
            {/* Recipe thumbnail image */}
            <img 
                className="dish-thumb" 
                src={`${dish['strMealThumb']}`} 
                alt={dish['strMeal']} 
            />
            {/* Recipe name */}
            <h4 className="dish-name">{dish['strMeal']}</h4>
        </div>
    );
}