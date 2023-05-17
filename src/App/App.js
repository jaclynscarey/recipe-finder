import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from '../components/NavBar/NavBar'

import IntroPage from '../pages/IntroPage/IntroPage';
import CategoriesPage from '../pages/CategoriesPage/CategoriesPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import ResultsPage from '../pages/ResultsPage/ResultsPage';
import RecipePage from '../pages/RecipePage/RecipePage';

export default function App() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [results, setResults] = useState(null);
  const [mealResult, setMealResult] = useState([]);
  const [category, setCategory] = useState(null);

  return (
    <main>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<IntroPage />} />
        <Route path='/category' element={<CategoriesPage setCategory={setCategory}/>} />
        <Route path='/search' element={<SearchPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} setResults={setResults} category={category} />} />
        <Route path='/search/results' element={<ResultsPage searchTerm={searchTerm} results={results} setMealResult={setMealResult} />} />
        <Route path='/search/recipe/:id' element={<RecipePage mealResult={mealResult} />} />          
      </Routes>
    </main>
  )
}
