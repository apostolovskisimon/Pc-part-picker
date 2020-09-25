import React from "react";
import { Link } from "react-router-dom";
import ItemsList from "../ItemsList/ItemsList";
import "./Landingpage.css";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="landing">
        <div className="overlay">
          <h1>Welcome to PC Part Picker!</h1>
          <p>
            Feel free to browse around,
            <br /> but remember you need to be logged in so you can save your
            favorite items in the cart.{" "}
          </p>
          <Link to="/products" className="link-shop">
            Check out our products!
          </Link>
        </div>
      </div>
      <ItemsList />
    </React.Fragment>
  );
};

export default LandingPage;
