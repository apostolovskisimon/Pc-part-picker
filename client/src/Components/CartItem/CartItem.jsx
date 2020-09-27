import React, { useState } from "react";
import { useContext } from "react";
import { PeriodicContext } from "../../Context/MainContext";
import StarRatings from "react-star-ratings";
import "./CartItem.css";

const CartItem = ({ title, desc, stars, price, id }) => {
  const { user, handleDeleteItem } = useContext(PeriodicContext);
  const [rating, setRating] = useState(0);

  const changeRating = (newRating, name) => {
    setRating(newRating);
  };

  return (
    <div className="cart-collection">
      <table>
        <thead>
          <tr>
            <th colSpan="3">Details</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3">
              <img src="" alt="" />
              <div className="cart-stars">
                <p>Average Rating:</p>
                <StarRatings
                  rating={stars}
                  starRatedColor="orange"
                  changeRating={changeRating}
                  starDimension="17px"
                  starSpacing="2px"
                  numberOfStars={5}
                  name="rating"
                />
              </div>
              <p className="cart-title">{title}</p>
              <p className="cart-desc">{desc}</p>
            </td>
            <td>
              <p className="cart-price">$300</p>
            </td>
            <td>
              <div className="cart-actions">
                <button>Buy Now</button>
                <button
                  onClick={() => {
                    handleDeleteItem(id);
                  }}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartItem;
