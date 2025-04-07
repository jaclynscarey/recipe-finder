/**
 * IntroPage component that displays a random recipe on the home page.
 * Features a recipe roulette that shows a different random recipe each time.
 * Allows users to navigate to the full recipe details.
 */
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function IntroPage({ setMealResult }) {
    // State for random recipe data
    const [randomDish, setRandomDish] = useState(undefined);
    const [id, setId] = useState(undefined);
    const navigate = useNavigate();

    /**
     * Effect hook to fetch a random recipe when component mounts
     * Updates both local and parent component state with recipe data
     */
    useEffect(() => {
        async function getRandomRecipe() {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                const result = await response.json();
                const randomMeal = result['meals'][0];
                setId(randomMeal['idMeal']);
                setRandomDish(randomMeal);
                setMealResult(randomMeal);
            } catch (error) {
                console.error("Error loading random recipe.")
            }
        }

        getRandomRecipe();
    }, [setMealResult]);

    // Loading state display
    if (!randomDish) {
        return (
            <div className="hourglass-div">
                <img className="hourglass" src={`${process.env.PUBLIC_URL}/hourglass.png`} alt="hourglass" />
            </div>
        )
    }

    /**
     * Handles click on recipe card
     * Navigates to the detailed recipe page
     * @param {Event} event - Click event
     */
    function handleClick(event) {
        event.preventDefault();
        navigate(`/search/recipe/${id}`);
    }

    return(
        <section>
            {/* Left section with random recipe display */}
            <div className="left-div">
                <article className="random-article">
                    <h1 className="random-h1">Get Ready for a Flavorful Roulette!</h1>
                    <h2 onClick={handleClick} className="random-h2">{randomDish['strMeal']}</h2>
                    <img onClick={handleClick} className="random-img" src={randomDish['strMealThumb']} alt={randomDish['strMeal']} />
                </article>
            </div>
            
            {/* Right section with search suggestion */}
            <div className="right-div">
                <article className="right-article">
                    <h3 className="flash">Like what you see??</h3>
                    <h1 className="right-h1">Find the recipe for "{randomDish['strMeal']}" by using our Search by Name feature.</h1>
                </article>
            </div>
        </section>         
    )
}