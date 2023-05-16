import './Dish.css';

export default function Dish({ dish, key }) {
    
    console.log(key);

    return (
        <div className="dish-div" id={key} >
            <img className="dish-thumb" src={dish['strMealThumb']} alt={dish['strMeal']} />
            <h4 className="dish-name">{dish['strMeal']}</h4>
        </div>
    )
}