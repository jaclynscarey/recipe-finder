/**
 * SearchForm component that handles recipe search functionality.
 * Provides different search interfaces based on the selected category (Name, Ingredient, or Nationality).
 * Integrates with TheMealDB API for recipe data.
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchForm.css';

// API endpoint configuration for different search categories
const endpoint = {
    "Nationality": ["filter.php?a=", "list.php?a=list", "strArea"],
    "Ingredient": ["filter.php?i=", "list.php?i=list", "strIngredient"],
    "Name": ["search.php?s=", "search.php?s=", "strMeal"],
};

export default function SearchForm({ searchTerm, setSearchTerm, setResults, category }) {
  // State for dropdown options based on search category
  const [dropDownItems, setDropDownItems] = useState([]);
  
  // API configuration
  const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
  const navigate = useNavigate();
  
  // Default to 'Name' category if none specified
  category = category || 'Name';

  /**
   * Effect hook to load dropdown options when category changes
   * Fetches available options from TheMealDB API
   */
  useEffect(() => {
    async function loadDropDownItems() {
      try {
        const response = await fetch(`${BASE_URL}${endpoint[category][1]}`);
        const results = await response.json();
        const resultsList = results['meals'];

        // Sort and format dropdown options
        const sortedItems = resultsList.map((obj, i) => obj[endpoint[category][2]]).sort();
        setDropDownItems(["", ...sortedItems]);
      } catch (error) {
        console.error('Error loading dropdown items.');
      }
    }
    
    loadDropDownItems();
  }, [endpoint, category]);

  // Loading state display
  if (!dropDownItems) {
    return (
        <div>
            <img className="hourglass" src={`${process.env.PUBLIC_URL}/hourglass.png`} alt="hourglass" />
        </div>
    )
  }

  /**
   * Handles input changes for name-based search
   */
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  /**
   * Handles form submission and recipe search
   * Fetches recipe data from TheMealDB API based on search criteria
   */
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let searchValue = searchTerm;
      
      // Use dropdown value for category-based searches
      if (category !== 'Name') {
        const selectedOption = event.target.querySelector('select').value;
        if (selectedOption) {
          searchValue = selectedOption;
        }
      }

      setSearchTerm(searchValue);

      // Fetch recipe data from API
      const response = await fetch(`${BASE_URL}${endpoint[category][0]}${searchValue}`);
      const results = await response.json();
      const resultsArr = results['meals'];
      setResults(resultsArr);

      // Navigate to results page with category and search term
      navigate(`/search/results/${category}/${searchValue}`);
    } catch (error) {
      console.error('Error submitting form.');
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label><h1 className='form-h1'>Find Recipes by {category}</h1></label>
      
      {/* Conditional rendering based on search category */}
      {category === 'Nationality' ? (
        // Nationality dropdown
        <select>
          {dropDownItems.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : category === 'Ingredient' ? (
        // Ingredient search with both input and dropdown
        <div className='ingredient-div'>
          <input type="text" onChange={handleChange} placeholder={`Search by Dish ${category}`} />
          <span className='ingredient-span'>Type your ingredient above<br />OR<br />Select from the dropdown menu below</span>
          <select>
            {dropDownItems.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : (
        // Name-based search input
        <input type="text" onChange={handleChange} placeholder={`Search by Dish ${category}`} required />
      )}
      
      {/* Search button */}
      <button type="submit">Search</button>
    </form>
  );
}
