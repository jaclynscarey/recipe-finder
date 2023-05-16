import SearchForm from "../../components/SearchForm/SearchForm";

export default function SearchPage({ category }) {
    return (
        <section>
            <SearchForm category={category} />
        </section>
    )
}