/**
 * CategoriesPage component that displays different search categories for recipes.
 * Allows users to choose between searching by name, ingredient, or nationality.
 */
import Category from "../../components/Category/Category";

export default function CategoriesPage({ setCategory, setSearchTerm }) {
    // Available search categories
    const categories = ["Name", "Ingredient", "Nationality"];

    // Reset search state when page loads
    setSearchTerm(undefined);
    setCategory(undefined);

    return (
        <section className="search-section">
            {/* Grid of category cards */}
            <div className="categories-div">
                {categories.map((category) => (
                    <Category 
                        key={category}
                        category={category}
                        categories={categories}
                        setCategory={setCategory}
                    />
                ))}
            </div>
        </section>
    );
}