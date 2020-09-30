import {
  faShoppingBasket,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../Assets/Images/LogoMakr_2qC11y.png";
import { PeriodicContext } from "../../Context/MainContext";
import "./navbar.css";
const Navbar = () => {
  let history = useHistory();
  const { loggedIn, user, setUser, setLoggedIn } = useContext(PeriodicContext);

  const [toggleUserMenu, setToggleUserMenu] = useState(false);
  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className="nav-form">
          {!loggedIn ? (
            <React.Fragment>
              <Link to="login" className="link">
                Log In
              </Link>
              <Link to="signup" className="link">
                Sign Up
              </Link>
            </React.Fragment>
          ) : (
            <div className="user-control">
              {/* // LINK TO CART ! */}
              <Link to="/cart" className="shopcart">
                <FontAwesomeIcon icon={faShoppingBasket} className="shopIcon" />
                <p>{user.cart.length}</p>
              </Link>
              <FontAwesomeIcon
                icon={faUser}
                className={toggleUserMenu ? "userIconToggled" : "userIcon"}
                onClick={() => setToggleUserMenu(!toggleUserMenu)}
              />
            </div>
          )}
        </div>
      </nav>

      {toggleUserMenu && (
        <div className="user-menu">
          <FontAwesomeIcon icon={faUserCircle} className="user" />
          <Link to="/dashboard" className="userName">
            {user.displayName}
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("USER");
              setUser({
                displayName: "",
                email: "",
              });
              setLoggedIn(false);
              history.push("/");
              setToggleUserMenu(false);
              window.location.reload();
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default Navbar;
