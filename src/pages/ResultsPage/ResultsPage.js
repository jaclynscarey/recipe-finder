import Dish from '../../components/Dish/Dish';

export default function ResultsPage() {
    const dishes = ['pasta', 'steak', 'chicken', 'lasagna', 'apple pie', 'ice cream', 'Pizza', 'Picanha', 'Spaghetti', 'Baiao-de-Dois'];

    return (
        <section>
            <h1>Results for 'search term'</h1>
            <div>
                {dishes.map((dish) => (
                    <Dish dish={dish} />
                ))}
            </div>
        </section>
    )
}