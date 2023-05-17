import { Link } from 'react-router-dom';
import './Category.css';

export default function Category({ setCategory, category, categories }) {
    function handleClick(event) {
        categories.forEach(x => {
            if (event.target.className.includes(x)) {
                setCategory(x);
            }
        });
    }

    return (
        <Link to="/search" >
            <div onClick={handleClick} className={`category-div ${category}`}>
            <img src={`${process.env.PUBLIC_URL}/${category}.jpg`} alt={category} className={`${category} category-img`} />
            <h4 className={`${category} category-h4`}>Search by {category}</h4>
            </div>
        </Link>
    )
}