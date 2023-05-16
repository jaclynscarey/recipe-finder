import './Dish.css';

export default function Dish({ dish }) {
    
    return (
        <div className="meal-div">
            <img className="meal-thumb" src={dish['strMealThumb']} alt="" />
            <h4 className="meal-name">{dish['strMeal']}</h4>
        </div>
    )
}