import './Category.css';

export default function Category({ setCategory, category }) {
    function handleClick(event) {
        if (event.target.className.includes('Name')) {
            setCategory('Name');
        } else if (event.target.className.includes('Nationality')) {
            setCategory('Nationality');
        } else if (event.target.className.includes('Ingredient')) {
            setCategory('Ingredient')
        }
    }

    return (
        <div onClick={handleClick} className={`category-div ${category}`}>
            <img src="#" alt={category} className={`${category}`} />
            <h4 className={`${category}`}>Search by {category}</h4>
        </div>
    )
}