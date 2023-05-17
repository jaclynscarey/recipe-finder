export default function SearchForm({ searchTerm, setSearchTerm, setResults, category }) {
    const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
    const endpoint = {
        "Nationality": "filter.php?a=",
        "Ingredient": "filter.php?i=",
        "Name": "search.php?s=",
    }

    console.log(endpoint[category])
    
    function handleChange(event) {
        setSearchTerm(event.target.value);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        
        try {
            const response = await fetch(`${BASE_URL}${endpoint[category]}${searchTerm}`); // search by dish name

            const results = await response.json();
            const resultsArr = results['meals'];
            setResults(resultsArr);

        } catch (error) {
            
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label><h1>Find Recipes by {category}</h1></label>
            <input type="text" value={searchTerm} onChange={handleChange} placeholder={`Search by ${category}`} required />
            <button type="submit">Search</button>
        </form>
    )
}