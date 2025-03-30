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
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [results, setResults] = useState(undefined);
  const [mealResult, setMealResult] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const userObject = jwtDecode(credentialResponse.credential);
    localStorage.setItem('user', JSON.stringify(userObject));
    setUser(userObject);
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <main>
        <NavBar user={user} onLogout={handleLogout} onLoginSuccess={handleLoginSuccess} />
        <Routes>
          <Route exact path='/' element={<IntroPage setMealResult={setMealResult}/>} />
          <Route path='/search' element={<CategoriesPage setCategory={setCategory} setSearchTerm={setSearchTerm} />} />
          <Route path='/search/:category' element={<SearchPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} setResults={setResults} category={category} />} />
          <Route path='/search/results/:searchTerm' element={<ResultsPage searchTerm={searchTerm} results={results} setMealResult={setMealResult} />} />
          <Route path='/search/recipe/:id' element={<RecipePage mealResult={mealResult} user={user} onLoginSuccess={handleLoginSuccess} />} />
          <Route path='/login-confirmation' element={<ProtectedRoute><LoginConfirmation /></ProtectedRoute>} />     
        </Routes>
        <Footer />
      </main>
    </GoogleOAuthProvider>
  );
}

