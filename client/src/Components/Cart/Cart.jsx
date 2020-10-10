import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PeriodicContext } from "../../Context/MainContext";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

const Cart = () => {
  const { user, buyMode, setBuyMode, buyedItem } = useContext(PeriodicContext);

  return (
    <React.Fragment>
      <div className="cart">
        {buyMode && (
          <div className="overlay-cart">
            <div className="ticket">
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="close-ticket"
                onClick={() => setBuyMode(false)}
              />
              <h3>
                Purchase successfull <span>id#{buyedItem.ticketID}</span>
              </h3>
              <div className="ticket-details">
                <h4>{buyedItem.title}</h4>
                <p>Amount: {buyedItem.quantity}</p>
                <p>Price: ${buyedItem.price} per unit</p>
              </div>
              <div className="ticket-total">
                In total: ${buyedItem.price * buyedItem.quantity}
              </div>
            </div>
          </div>
        )}
        <div className="cart-heading">
          <Link to="/" className="productLink">
            Browse more
          </Link>
        </div>

        {user.cart.length === 0 ? (
          <h2>Its empty in here. Try adding some items.</h2>
        ) : (
          <table>
            <thead>
              <tr>
                <th colSpan="3">Details</th>
                <th>Quantity and Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.cart.map((el, i) => {
                return (
                  <CartItem
                    key={i}
                    title={el.title}
                    shortDesc={el.shortDesc}
                    stars={el.rating}
                    price={el.price}
                    id={el._id}
                    category={el.category}
                    image={el.image}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
};

export default Cart;
