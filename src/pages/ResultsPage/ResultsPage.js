import Dish from '../../components/Dish/Dish';

export default function ResultsPage() {
    return (
        <main className='results-main'>
            <h1>Results for 'search term'</h1>
            <section className='results-section'>
                <Dish />
            </section>
        </main>
    )
}