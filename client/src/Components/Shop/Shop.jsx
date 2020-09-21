import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PeriodicContext } from "../../Context/MainContext";
import "./shop.css";

const Shop = () => {
  const { loggedIn, setLoggedIn } = useContext(PeriodicContext);

  return (
    <div className="shop">
      <h1>This is SHOP page</h1>

      <Link to="/">Go home</Link>
    </div>
  );
};

export default Shop;
