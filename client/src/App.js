import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from "./Components/Cart/Cart";
import Dashboard from "./Components/Dashboard/Dashboard";
import Footer from "./Components/Footer/Footer";
import LandingPage from "./Components/LandingPage/Landingpage";
import Login from "./Components/Login/Signup/Login";
import Signup from "./Components/Login/Signup/Signup";
import Navbar from "./Components/Navbar/Navbar";
import Products from "./Components/Products/Products";
import { PeriodicProvider } from "./Context/MainContext";

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
            <Route path="/products" exact component={Products} />
            <Route path="/cart" exact component={Cart} />
          </Switch>
          <Footer />
        </Router>
      </PeriodicProvider>
    </React.Fragment>
  );
}

export default App;
