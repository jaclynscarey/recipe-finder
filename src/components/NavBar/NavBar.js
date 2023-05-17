import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
    return (
        <ul className="navbar">
            <Link to="/"><li>Home</li></Link>
            <Link to="/search"><li>Search</li></Link>
        </ul>
    )
}