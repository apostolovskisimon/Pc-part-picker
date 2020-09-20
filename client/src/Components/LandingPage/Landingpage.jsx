import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PeriodicContext } from "../../Context/MainContext";

const LandingPage = () => {
  const { loggedIn, setLoggedIn } = useContext(PeriodicContext);

  return <div className="landing">{loggedIn && <p>YOu are logged in!</p>}</div>;
};

export default LandingPage;
