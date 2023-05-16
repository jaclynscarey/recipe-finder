import Dish from '../../components/Dish/Dish';

export default function ResultsPage({ dishes }) {
    return (
        <section>
            <h1>Results for 'search term'</h1>
            <div className='dish-container'>
                {dishes.map((dish) => (
                    <Dish dish={dish} />
                ))}
            </div>
        </section>
    )
}