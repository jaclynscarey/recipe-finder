import './Dish.css';

export default function Dish({ dish }) {

    return (
        <div className="dish-div">
            <img className="dish-thumb" src={dish['strMealThumb']} alt={dish['strMeal']} />
            <h4 className="dish-name">{dish['strMeal']}</h4>
        </div>
    )
}