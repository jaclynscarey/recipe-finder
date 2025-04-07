/**
 * SearchPage component that serves as a container for the SearchForm.
 * Provides a consistent layout for the search interface across different categories.
 */
import SearchForm from "../../components/SearchForm/SearchForm";

export default function SearchPage({ searchTerm, setSearchTerm, setResults, category }) {
    return (
        <section className="search-section">
            <SearchForm 
                category={category} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                setResults={setResults} 
            />
        </section>
    )
}