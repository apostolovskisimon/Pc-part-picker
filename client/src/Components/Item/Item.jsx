import React, { useContext, useState } from "react";
import StarRatings from "react-star-ratings";
import { PeriodicContext } from "../../Context/MainContext";
import "./Item.css";
const Item = ({ id, name, stars, quantity, description }) => {
  const { cart, handleAddToCart } = useContext(PeriodicContext);
  const [rating, setRating] = useState(0);
  const changeRating = (newRating, name) => {
    setRating(newRating);
  };
  return (
    <div className="item">
      <div className="item-pic">
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/51iVSqLIBWL._AC_.jpg"
          alt=""
        />
      </div>
      <div className="rating-cart">
        <StarRatings
          rating={stars}
          starRatedColor="blue"
          changeRating={changeRating}
          numberOfStars={5}
          name="rating"
        />
        <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
      </div>
      <h3>{name}</h3>
      <p>ID: {id}</p>

      <p>
        {description} <span>quantity:{quantity}</span>
      </p>
      {/* <p>Powerful Gaming CPU</p> */}
    </div>
  );
};

export default Item;
