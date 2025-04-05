import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchForm.css';

export default function SearchForm({ searchTerm, setSearchTerm, setResults, category }) {
  const [dropDownItems, setDropDownItems] = useState([]);
  const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        console.error('Error loading dropdown items.');
      }
    }
    
    loadDropDownItems();
  }, [endpoint, category]);

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
      console.error('Error submitting form.');
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label><h1 className='form-h1'>Find Recipes by {category}</h1></label>
      {category === 'Nationality' ? (
        <select>
          {dropDownItems.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : category === 'Ingredient' ? (
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
        <input type="text" onChange={handleChange} placeholder={`Search by Dish ${category}`} required />
      )}
      <button type="submit">Search</button>
    </form>
  );
}
