import { useEffect, useState } from "react";

export default function IntroPage() {
    const [randomDish, setRandomDish] = useState(undefined);

    useEffect(() => {
        async function getRandomRecipe() {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                const result = await response.json();
                const randomMeal = result['meals'][0];
                setRandomDish(randomMeal);
            } catch (error) {
                console.error("Error loading random recipe")
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


    return(
        <section>
            <div className="left-div">
                <h1>Randomly Selected Dish for YOU!</h1>
                <h2>{randomDish['strMeal']}</h2>
                <img className="random-img" src={randomDish['strMealThumb']} alt={randomDish['strMeal']} />
            </div>
            <div className="right-div">
                <article>
                    <h3>Like what you see??</h3>
                    <h1>Use our 'Search' button above to find this recipe by name.</h1>
                </article>
            </div>
        </section>
    )
}