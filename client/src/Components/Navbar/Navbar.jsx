import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { PeriodicContext } from "../../Context/MainContext";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
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
          <div className="user-control">
            <p>Hello, {user.displayName}</p>
            <Link to="/dashboard">see dashboard</Link>
            <div className="cart-icon">
              <p>cart lenght</p>
              <FontAwesomeIcon icon={faCartPlus} />
            </div>
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
