import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
    return (
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
        </ul>
    )
}