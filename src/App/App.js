import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from '../components/NavBar/NavBar'

import IntroPage from '../pages/IntroPage/IntroPage';
import CategoriesPage from '../pages/CategoriesPage/CategoriesPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import ResultsPage from '../pages/ResultsPage/ResultsPage';
import RecipePage from '../pages/RecipePage/RecipePage';
import Footer from '../components/Footer/Footer';

export default function App() {
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [results, setResults] = useState(undefined);
  const [mealResult, setMealResult] = useState(undefined);
  const [category, setCategory] = useState(undefined);

  return (
    <main>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<IntroPage setMealResult={setMealResult}/>} />
        <Route path='/search' element={<CategoriesPage setCategory={setCategory} setSearchTerm={setSearchTerm} />} />
        <Route path='/search/:category' element={<SearchPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} setResults={setResults} category={category} />} />
        <Route path='/search/results/:searchTerm' element={<ResultsPage searchTerm={searchTerm} results={results} setMealResult={setMealResult} />} />
        <Route path='/search/recipe/:id' element={<RecipePage mealResult={mealResult} />} />          
      </Routes>
      <Footer />
    </main>
  )
}
