import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { PeriodicContext } from "../../Context/MainContext";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

const Cart = () => {
  const { user } = useContext(PeriodicContext);

  return (
    <div className="cart">
      <div className="cart-heading">
        <Link to="/products">Browse products</Link>
        <div>
          <button>Buy All</button>
        </div>
      </div>
      {user.cart.length === 0 ? (
        <h2>Its empty in here. Try adding some items</h2>
      ) : (
        user.cart.map((el, i) => {
          return (
            <CartItem
              key={i}
              title={el.title}
              desc={el.description}
              stars={el.rating}
              price={el.price}
              id={el.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Cart;
