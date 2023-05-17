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
  const [category, setCategory] = useState(null)


  return (
    <main>
      <NavBar />
      <IntroPage />
      <CategoriesPage setCategory={setCategory}/>
      <SearchPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} setResults={setResults} category={category} />
      <ResultsPage searchTerm={searchTerm} results={results} />
      <RecipePage />
    </main>
  )
}
