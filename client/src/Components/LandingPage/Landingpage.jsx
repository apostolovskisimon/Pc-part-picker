import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PeriodicContext } from "../../Context/MainContext";
import "./Landingpage.css";

const LandingPage = () => {
  const { loggedIn, setLoggedIn } = useContext(PeriodicContext);

  return (
    <div className="landing">
      <h1>Welcome to PC Part Picker</h1>
      <p>
        Feel free to browse around and pick and item you wish and add it to your
        cart.
      </p>
      <Link to="/shop">Check out our shop!</Link>
    </div>
  );
};

export default LandingPage;
