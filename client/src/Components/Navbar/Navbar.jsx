import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { PeriodicContext } from "../../Context/MainContext";
import "./navbar.css";

const Navbar = () => {
  let history = useHistory();
  const {
    showLoginForm,
    setShowLoginForm,
    setShowSignupForm,
    showSignupForm,
    loggedIn,
    user,
    setUser,
    setLoggedIn,
  } = useContext(PeriodicContext);
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">PC Part Picker</Link>
      </div>
      <div className="links">
        <Link to="/" className="anchor">
          Home
        </Link>
        <Link to="" className="anchor">
          Products
        </Link>
        <Link to="" className="anchor">
          Cart
        </Link>
        <Link to="" className="anchor">
          Contact
        </Link>
      </div>
      <div className="nav-form">
        {!loggedIn ? (
          <React.Fragment>
            <Link to="login">Log In</Link>
            <Link to="signup">Sign Up</Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p>Hello, {user.displayName}</p>
            <Link to="/dashboard">see dashboard</Link>
            <button
              onClick={() => {
                localStorage.removeItem("USER");
                setUser({
                  displayName: "",
                  email: "",
                });
                setLoggedIn(false);
                history.push("/");
              }}
            >
              Log Out
            </button>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
