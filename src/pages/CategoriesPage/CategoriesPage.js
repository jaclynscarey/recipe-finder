import Category from "../../components/Category/Category";

export default function CategoriesPage({ setCategory, setSearchTerm }) {
    const categories = ['Nationality', 'Ingredient', 'Name'];

    setSearchTerm(undefined);
    setCategory(undefined);

    return (
        <section>
            <h1>Search by:</h1>
            <div className="categories-container">
                {categories.map((category) => (
                    <Category key={category} setCategory={setCategory} category={category} categories={categories} />
                ))}
            </div>
        </section>
    )
}