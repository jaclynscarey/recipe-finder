import Dish from '../../components/Dish/Dish';

export default function ResultsPage({ results, searchTerm }) {

    const newArr = results.map((meal) => meal)

    return (
        <section>
            <h1>Results for {searchTerm}</h1>
            <div className='dish-container'>
                {newArr.map((dish) => 
                    <Dish dish={dish}/>
                )}
            </div>
        </section>
    )
}