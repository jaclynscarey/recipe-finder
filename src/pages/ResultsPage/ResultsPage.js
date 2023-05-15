import Dish from '../../components/Dish/Dish';

export default function ResultsPage() {
    const dishes = ['pasta', 'steak', 'chicken', 'lasagna', 'apple pie', 'ice cream'];

    return (
        <section>
            <h1>Results for 'search term'</h1>
            {dishes.map((dish) => (
                <Dish dish={dish} />
            ))}
        </section>
    )
}