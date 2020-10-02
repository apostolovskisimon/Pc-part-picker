import React, { useContext, useState } from "react";
import StarRatings from "react-star-ratings";
import { PeriodicContext } from "../../Context/MainContext";
import "./CartItem.css";

const CartItem = ({ title, desc, stars, price, id, category, image }) => {
  const { handleDeleteItem, handleBuyItem } = useContext(PeriodicContext);
  const [quantity, setQuantity] = useState(1);

  return (
    <tr>
      <td colSpan="3">
        <img
          className="imgs"
          src={require(`../../Assets/Images/${image}.jpg`)}
          alt="img"
        />
        <div className="cart-stars">
          <p>Average Rating:</p>
          <StarRatings
            rating={stars}
            starRatedColor="orange"
            starDimension="17px"
            starSpacing="2px"
            numberOfStars={5}
            name="rating"
          />
        </div>
        <p className="categ">{category}</p>
        <p className="cart-title">{title}</p>
        <p className="cart-desc">{desc}</p>
      </td>
      <td>
        <div className="item-amount-price">
          Amount of item:
          <select
            name="quantity"
            id="quant"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            value={quantity}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <p className="price-per">Price per 1 item: ${price}</p>
        <br />
        <p className="cart-price">Total: ${quantity * price}</p>
      </td>
      <td>
        <div className="cart-actions">
          <button
            onClick={() => {
              handleBuyItem(id, quantity);
              setQuantity(1);
            }}
            className="btn-buy"
          >
            Buy Now
          </button>
          <button
            onClick={() => {
              handleDeleteItem(id);
            }}
            className="btn-del"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
