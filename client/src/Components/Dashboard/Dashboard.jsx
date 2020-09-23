import React, { useContext, useEffect } from "react";
import { PeriodicContext } from "../../Context/MainContext";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";
const Dashboard = () => {
  let history = useHistory();
  const { user, loggedIn } = useContext(PeriodicContext);

  return (
    <React.Fragment>
      <div className="dashboard">
        <h1>HELLO!</h1>
        <h2>{user.displayName}</h2>
        <p>Items in cart: {user.cart.length}</p>
        {user.cart.map((el, i) => {
          return (
            <p key={i}>
              {el.title}, a {el.description}.
            </p>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
