import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PeriodicContext } from "../../Context/MainContext";
import "./navbar.css";

const Navbar = () => {
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
            <Link to="login" onClick={() => setShowSignupForm(!showSignupForm)}>
              Log In
            </Link>
            <Link to="signup">Sign Up</Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p>Hello, {user}</p>
            <button
              onClick={() => {
                localStorage.removeItem("userLoggedIn");
                setUser("");
                setLoggedIn(false);
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
