import Dish from '../../components/Dish/Dish';

export default function ResultsPage({ dishes, searchTerm }) {
    return (
        <section>
            <h1>Results for {searchTerm}</h1>
            <div className='dish-container'>
                {dishes.map((dish) => (
                    <Dish dish={dish} />
                ))}
            </div>
        </section>
    )
}