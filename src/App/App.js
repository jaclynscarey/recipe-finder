/**
 * Main App component that serves as the root of the application.
 * Manages global state and routing for the recipe finder application.
 */
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';

// Components
import NavBar from '../components/NavBar/NavBar'
import LoginConfirmation from '../components/LoginConfirmation/LoginConfirmation';
import Footer from '../components/Footer/Footer';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

// Pages
import IntroPage from '../pages/IntroPage/IntroPage';
import CategoriesPage from '../pages/CategoriesPage/CategoriesPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import ResultsPage from '../pages/ResultsPage/ResultsPage';
import RecipePage from '../pages/RecipePage/RecipePage';

export default function App() {
  // Google OAuth client ID from environment variables
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // Global state management for recipe search and display
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [results, setResults] = useState(undefined);
  const [mealResult, setMealResult] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  
  // User authentication state
  const [user, setUser] = useState(null);

  /**
   * Effect hook to check for existing user session on app load
   * Retrieves user data from localStorage if available
   */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /**
   * Handles successful Google OAuth login
   * Decodes the JWT credential and stores user data
   */
  const handleLoginSuccess = (credentialResponse) => {
    const userObject = jwtDecode(credentialResponse.credential);
    localStorage.setItem('user', JSON.stringify(userObject));
    setUser(userObject);
  };

  /**
   * Handles user logout
   * Clears user data from localStorage and updates user state
   */
  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <main>
        {/* Navigation bar with user authentication */}
        <NavBar user={user} onLogout={handleLogout} onLoginSuccess={handleLoginSuccess} />
        
        {/* Application routes */}
        <Routes>
          {/* Home page with random recipe */}
          <Route exact path='/' element={<IntroPage setMealResult={setMealResult}/>} />
          
          {/* Recipe search and browsing routes */}
          <Route path='/search' element={<CategoriesPage setCategory={setCategory} setSearchTerm={setSearchTerm} />} />
          <Route path='/search/:category' element={<SearchPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} setResults={setResults} category={category} />} />
          <Route path='/search/results/:category/:searchTerm' element={<ResultsPage searchTerm={searchTerm} results={results} setMealResult={setMealResult} />} />
          
          {/* Individual recipe view */}
          <Route path='/search/recipe/:id' element={<RecipePage mealResult={mealResult} user={user} onLoginSuccess={handleLoginSuccess} />} />
          
          {/* Protected route for login confirmation */}
          <Route path='/login-confirmation' element={<ProtectedRoute><LoginConfirmation /></ProtectedRoute>} />     
        </Routes>
        
        {/* Application footer */}
        <Footer />
      </main>
    </GoogleOAuthProvider>
  );
}

