/**
 * Category component that displays a single search category card.
 * Shows an image and category name, and handles navigation to the search page.
 */
import { Link } from 'react-router-dom';
import './Category.css';

export default function Category({ setCategory, category, categories }) {
    /**
     * Handles click on category card
     * Updates the selected category in parent component
     * @param {Event} event - Click event
     */
    function handleClick(event) {
        categories.forEach(x => {
            if (event.target.className.includes(x)) {
                setCategory(x);
            }
        });
    }

    return (
        <Link className='category-link' to={`/search/${category}`} >
            <div onClick={handleClick} className={`category-div ${category}`}>
                {/* Category image */}
                <img 
                    src={`${process.env.PUBLIC_URL}/${category}.jpg`} 
                    alt={category} 
                    className={`${category} category-img`} 
                />
                {/* Category name */}
                <h4 className={`${category} category-h4`}>Search by<br /> {category}</h4>
            </div>
        </Link>
    );
}