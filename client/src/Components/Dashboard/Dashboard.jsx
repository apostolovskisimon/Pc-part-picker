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
        <p>You have purchased:</p>
        {user.purchaseHistory.map((el, i) => {
          return (
            <p key={i}>
              #{el.quantity} of {el.title} for a total of{" "}
              {el.quantity * el.price}
            </p>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
