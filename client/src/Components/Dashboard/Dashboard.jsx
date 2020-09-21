import React, { useContext, useEffect } from "react";
import { PeriodicContext } from "../../Context/MainContext";
import { useHistory } from "react-router-dom";
const Dashboard = () => {
  let history = useHistory();
  const { user, loggedIn } = useContext(PeriodicContext);

  // useEffect(() => {
  //   if (!loggedIn) {
  //     history.push("/");
  //   }
  // }, []);

  return (
    <React.Fragment>
      <div className="dashboard">
        <h1>HELLO!</h1>
        <h2>{user.displayName}</h2>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
