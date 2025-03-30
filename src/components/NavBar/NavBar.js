import './NavBar.css';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

export default function NavBar({ user, onLogout, onLoginSuccess }) {
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginError = () => {
        console.error('Login Failed');
    };

    return (
        <>
        <ul className="navbar">
            <Link to="/">
                <li className='navbar'>
                    <img src={`${process.env.PUBLIC_URL}/home.png`} alt="Home" />
                    <span>Home</span>
                </li>
            </Link>
            <Link to="/search">
                <li className='navbar'>
                    <img src={`${process.env.PUBLIC_URL}/search.png`} alt="Search" />
                    <span>Search</span>
                </li>
            </Link>

            {user ? (
                <>
                    <li className="navbar">
                        <span className='logout-button' onClick={onLogout}>Logout</span>
                    </li>
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
                <li className='navbar' onClick={() => setShowLogin(!showLogin)} style={{ cursor: 'pointer' }}>
                    <span>Login</span>
                </li>
            )}
        </ul>

        {showLogin && (
            <div style={{ position: 'absolute', top: '60px', right: '20px', zIndex: 1000 }}>
                <GoogleLogin onSuccess={onLoginSuccess} onError={handleLoginError} />
            </div>
        )}
        </>
    );
}