import { useState } from "react";

export default function SearchForm({ category }) {
    const [searchTerm, setSearchTerm] = useState(null);

    function handleChange(event) {
        setSearchTerm(event.target.value);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`); // search by dish name
            console.log(response);

            const results = await response.json();
            console.log(results.result);

        } catch (error) {
            
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label><h1>Find Recipes by 'category'</h1></label>
            <input type="text" value={searchTerm} onChange={handleChange} placeholder={`Search by ${category}`} required />
            <button type="submit">Search</button>
        </form>
    )
}