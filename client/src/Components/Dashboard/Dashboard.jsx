import React, { useContext } from "react";
import { PeriodicContext } from "../../Context/MainContext";
import "./Dashboard.css";
const Dashboard = () => {
  const { user } = useContext(PeriodicContext);

  return (
    <React.Fragment>
      <div className="dashboard">
        <h1>Hello {user.displayName}!</h1>

        <p className="purch">This is your purhcase history:</p>
        {user.purchaseHistory.map((el, i) => {
          return (
            <p key={i} className="purch-item">
              <strong> #{el.quantity}</strong> of <strong>{el.title}</strong>{" "}
              for a total of
              <strong> ${el.quantity * el.price}</strong>
            </p>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
