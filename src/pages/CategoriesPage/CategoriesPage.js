import Category from "../../components/Category/Category";

export default function CategoriesPage({ categories }) {   
    return (
        <section>
            <h1>Search by:</h1>
            <div className="categories-container">
                {categories.map((category) => (
                    <Category category={category} />
                ))}
            </div>
        </section>
    )
}