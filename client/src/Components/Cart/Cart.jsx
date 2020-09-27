import React from "react";
import { useContext } from "react";
import { PeriodicContext } from "../../Context/MainContext";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

const Cart = () => {
  const { user } = useContext(PeriodicContext);
  console.log(user.cart);
  return (
    <div className="cart">
      {user.cart.map((el, i) => {
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
      })}
    </div>
  );
};

export default Cart;
