import Category from "../../components/Category/Category";

export default function CategoriesPage({ setCategory, setSearchTerm }) {
    const categories = ['Nationality', 'Ingredient', 'Name'];

    setSearchTerm(undefined);
    setCategory(undefined);

    return (
        <section className="categories-section">
            <div className="categories-div">
                {categories.map((category) => (
                    <Category key={category} setCategory={setCategory} category={category} categories={categories} />
                ))}
            </div>
        </section>
    )
}