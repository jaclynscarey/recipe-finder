import { useNavigate } from 'react-router-dom';
import './Dish.css';

export default function Dish({ dish, id, setMealResult }) {
    const navigate = useNavigate();

    async function handleClick(event) {
        event.preventDefault();

        try {
            const mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`) 
            const mealResults = await mealResponse.json();
            setMealResult(mealResults.meals[0])

            navigate(`/search/recipe/${id}`)
        
        } catch (error) {
            console.error('Error accessing this recipe: ', error);
        }
    }

    return (
        <div onClick={handleClick} className="dish-div">
            <img className="dish-thumb" src={`${dish['strMealThumb']}`} alt={dish['strMeal']} />
            <h4 className="dish-name">{dish['strMeal']}</h4>
        </div>
    )
}