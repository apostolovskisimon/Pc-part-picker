import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage/Landingpage";
import Signup from "./Components/Login/Signup/Signup";
import Login from "./Components/Login/Signup/Login";

import Navbar from "./Components/Navbar/Navbar";
import {
  ContextProvider,
  MainContext,
  PeriodicProvider,
} from "./Context/MainContext";
import Dashboard from "./Components/Dashboard/Dashboard";
import Shop from "./Components/Shop/Shop";
import Products from "./Components/Products/Products";

function App() {
  return (
    <React.Fragment>
      <PeriodicProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/shop" exact component={Shop} />
            <Route path="/products" exact component={Products} />
          </Switch>
        </Router>
      </PeriodicProvider>
    </React.Fragment>
  );
}

export default App;
