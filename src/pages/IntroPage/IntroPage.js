import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function IntroPage({ setMealResult }) {
    const [randomDish, setRandomDish] = useState(undefined);
    const [id, setId] = useState(undefined);
    const navigate = useNavigate();

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
                console.error("Error loading random recipe: ", error)
            }
        }

        getRandomRecipe();
    }, []);

    if (!randomDish) {
        return (
            <div className="hourglass-div">
                <img className="hourglass" src={`${process.env.PUBLIC_URL}/hourglass.png`} alt="hourglass" />
            </div>
        )
    }

    function handleClick(event) {
        event.preventDefault();

        navigate(`/search/recipe/${id}`);
    }

    return(
        <section>
            <div className="left-div">
                <article className="random-article">
                    <h1 className="random-h1">Get Ready for a Flavorful Roulette!</h1>
                    <h2 onClick={handleClick} className="random-h2">{randomDish['strMeal']}</h2>
                    <img onClick={handleClick} className="random-img" src={randomDish['strMealThumb']} alt={randomDish['strMeal']} />
                </article>
            </div>
            <div className="right-div">
                <article className="right-article">
                    <h3 className="flash">Like what you see??</h3>
                    <h1 className="right-h1">Find the recipe for "{randomDish['strMeal']}" by using our Search by Name feature.</h1>
                </article>
            </div>
        </section>         
    )
}