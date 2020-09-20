import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage/Landingpage";
import LoginOrSignup from "./Components/Login/Signup/LoginOrSignup";
import Navbar from "./Components/Navbar/Navbar";
import {
  ContextProvider,
  MainContext,
  PeriodicProvider,
} from "./Context/MainContext";

function App() {
  return (
    <React.Fragment>
      <PeriodicProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" exact component={LoginOrSignup} />
            <Route path="/signup" exact component={LoginOrSignup} />
          </Switch>
        </Router>
      </PeriodicProvider>
    </React.Fragment>
  );
}

export default App;
