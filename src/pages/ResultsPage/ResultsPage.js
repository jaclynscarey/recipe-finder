import Dish from '../../components/Dish/Dish';

export default function ResultsPage({ results, searchTerm }) {
    let meals;
    if (results) {
        meals = results.map((meal) => meal)
    }

    return (
        <section>
            <h1>Results for {searchTerm}</h1>
            { results ?
                <div className='dish-container'>
                    {meals.map((meal) => 
                        <Dish key={meal['idMeal']} dish={meal}/>
                    )}
                </div>
                : "Your search had no results"
            }
        </section>
    )
}