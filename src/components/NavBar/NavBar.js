/**
 * Navigation bar component that provides main navigation and user authentication.
 * Displays different options based on user authentication status.
 */
import './NavBar.css';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

export default function NavBar({ user, onLogout, onLoginSuccess }) {
    // State to control the visibility of the login dropdown
    const [showLogin, setShowLogin] = useState(false);

    /**
     * Handles Google OAuth login errors
     */
    const handleLoginError = () => {
        console.error('Login Failed');
    };

    return (
        <>
        {/* Main navigation list */}
        <ul className="navbar">
            {/* Home link */}
            <Link to="/">
                <li className='navbar'>
                    <img src={`${process.env.PUBLIC_URL}/home.png`} alt="Home" />
                    <span>Home</span>
                </li>
            </Link>

            {/* Search link */}
            <Link to="/search">
                <li className='navbar'>
                    <img src={`${process.env.PUBLIC_URL}/search.png`} alt="Search" />
                    <span>Search</span>
                </li>
            </Link>

            {/* Conditional rendering based on user authentication status */}
            {user ? (
                // Logged in user view
                <>
                    {/* Logout button */}
                    <li className="navbar">
                        <span className='logout-button' onClick={onLogout}>Logout</span>
                    </li>
                    {/* User profile information */}
                    <li className="navbar user-info">
                        <img
                            src={user.picture}
                            alt={user.given_name}
                            style={{ width: '45px', borderRadius: '50%', marginRight: '8px' }}
                        />
                        <span>{user.given_name}</span>
                    </li>
                </>
            ) : (
                // Guest user view
                <li className='navbar' onClick={() => setShowLogin(!showLogin)} style={{ cursor: 'pointer' }}>
                    <span>Login</span>
                </li>
            )}
        </ul>

        {/* Login dropdown menu */}
        {showLogin && (
            <div style={{ position: 'absolute', top: '60px', right: '20px', zIndex: 1000 }}>
                <GoogleLogin onSuccess={onLoginSuccess} onError={handleLoginError} />
            </div>
        )}
        </>
    );
}