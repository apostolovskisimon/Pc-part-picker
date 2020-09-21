import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PeriodicContext } from "../../Context/MainContext";
import Item from "../Item/Item";
import ItemsList from "../ItemsList/ItemsList";
import "./Landingpage.css";

const LandingPage = () => {
  const { loggedIn, setLoggedIn } = useContext(PeriodicContext);

  return (
    <React.Fragment>
      <div className="landing">
        <h1>Welcome to PC Part Picker</h1>
        <p>
          Feel free to browse around and pick and item you wish and add it to
          your cart.
        </p>
        <Link to="/shop">Check out our shop!</Link>
      </div>
      <ItemsList />
    </React.Fragment>
  );
};

export default LandingPage;
