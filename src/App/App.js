import './App.css';
import { Routes, Route } from 'react-router-dom';

import NavBar from '../components/NavBar/NavBar'

import IntroPage from '../pages/IntroPage/IntroPage';
import CategoriesPage from '../pages/CategoriesPage/CategoriesPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import ResultsPage from '../pages/ResultsPage/ResultsPage';
import RecipePage from '../pages/RecipePage/RecipePage';

export default function App() {
  return (
    <main>
      <NavBar />
      <IntroPage />
      <CategoriesPage />
      <SearchPage />
      <ResultsPage />
      <RecipePage />
    </main>
  )
}
