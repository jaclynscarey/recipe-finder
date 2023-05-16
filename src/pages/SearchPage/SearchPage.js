import SearchForm from "../../components/SearchForm/SearchForm";

export default function SearchPage({ searchTerm, setSearchTerm, setResults, category }) {
    return (
        <section>
            <SearchForm category={category} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setResults={setResults} />
        </section>
    )
}