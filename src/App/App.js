import './App.css';
import { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';

import NavBar from '../components/NavBar/NavBar'

import IntroPage from '../pages/IntroPage/IntroPage';
import CategoriesPage from '../pages/CategoriesPage/CategoriesPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import ResultsPage from '../pages/ResultsPage/ResultsPage';
import RecipePage from '../pages/RecipePage/RecipePage';

export default function App() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [results, setResults] = useState([]);

  // console.log("results from App: " + typeof(results))

  const categories = ['Nationality', 'Ingredient', 'Name'];

  return (
    <main>
      <NavBar />
      <IntroPage />
      <CategoriesPage categories={categories}/>
      <SearchPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} setResults={setResults} />
      <ResultsPage searchTerm={searchTerm} results={results} />
      <RecipePage />
    </main>
  )
}
