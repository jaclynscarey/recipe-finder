/**
 * Footer component that displays copyright information.
 * Shows the current year and application name.
 */
import './Footer.css';

export default function Footer() {
    return (
        <footer>
            <span>Copyright &copy; All Rights Reserved {new Date().getFullYear()} Recipe Finder</span>
        </footer>
    )
}