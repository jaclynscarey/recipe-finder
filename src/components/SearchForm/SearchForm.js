import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchForm({ searchTerm, setSearchTerm, setResults, category }) {
  const [dropDownItems, setDropDownItems] = useState([]);
  const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
  const navigate = useNavigate();
  const endpoint = {
    "Nationality": ["filter.php?a=", "list.php?a=list", "strArea"],
    "Ingredient": ["filter.php?i=", "list.php?i=list", "strIngredient"],
    "Name": ["search.php?s=", "search.php?s=", "strMeal"],
  };
  
  category = category || 'Name';

  useEffect(() => {
    async function loadDropDownItems() {
      try {
        const response = await fetch(`${BASE_URL}${endpoint[category][1]}`);
        const results = await response.json();
        const resultsList = results['meals'];

        const sortedItems = resultsList.map((obj, i) => obj[endpoint[category][2]]).sort();
        setDropDownItems(["", ...sortedItems]);
      } catch (error) {
        console.error('Error loading dropdown items: ', error);
      }
    }
    
    loadDropDownItems();
  }, [category]);

  if (!dropDownItems) {
    return (
        <div>
            <img className="hourglass" src={`${process.env.PUBLIC_URL}/hourglass.png`} alt="hourglass" />
        </div>
    )
}

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let searchValue = searchTerm;
      
      if (category !== 'Name') {
        const selectedOption = event.target.querySelector('select').value;
        if (selectedOption) {
          searchValue = selectedOption;
        }
      }

      setSearchTerm(searchValue);

      const response = await fetch(`${BASE_URL}${endpoint[category][0]}${searchValue}`);
      const results = await response.json();
      const resultsArr = results['meals'];
      setResults(resultsArr);

      navigate(`/search/results/${searchValue}`);
    } catch (error) {
      console.error('Error submitting form: ', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label><h1>Find Recipes by {category}</h1></label>
      {category === 'Nationality' ? (
        <select>
          {dropDownItems.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : category === 'Ingredient' ? (
        <div>
          <input type="text" onChange={handleChange} placeholder={`Search by ${category}`} />
          <select>
            {dropDownItems.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <input type="text" onChange={handleChange} placeholder={`Search by ${category}`} required />
      )}
      <button type="submit">Search</button>
    </form>
  );
}
