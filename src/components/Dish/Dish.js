import './Dish.css';

export default function Dish({ dish }) {
    return (
        <div className="dish-div">
            <img className="dish-thumb" src="#" alt={dish} />
            <h4 className="dish-name">{dish}</h4>
        </div>
    )
}