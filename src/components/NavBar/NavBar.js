import './NavBar.css';
import { Link } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

export default function NavBar() {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);

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
        setShowLogin(false);
        window.location.href = '/login-confirmation'; // redirect after successful login
    };

    const handleLoginError = () => {
        console.error('Login Failed');
    };

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/';
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
                        <span className='logout-button' onClick={handleLogout}>Logout</span>
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
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
            </div>
        )}
        </>
    );
}