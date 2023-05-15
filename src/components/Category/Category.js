import './Category.css';

export default function Category({ category }) {    
    return (
        <div className='category-div'>
            <img src="#" alt={category} />
            <h4>Search by {category}</h4>
        </div>
    )
}