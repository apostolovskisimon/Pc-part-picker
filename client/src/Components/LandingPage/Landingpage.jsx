import React from "react";
import Products from "../Products/Products";
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
        </div>
      </div>
      <Products />
    </React.Fragment>
  );
};

export default LandingPage;
