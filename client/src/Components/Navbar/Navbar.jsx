import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { PeriodicContext } from "../../Context/MainContext";
import "./navbar.css";
import logo from "../../Assets/Images/LogoMakr_2qC11y.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  let history = useHistory();
  const {
    loggedIn,
    user,
    setUser,
    setLoggedIn,
    handleSearch,
    searchedItems,
  } = useContext(PeriodicContext);

  const [searchMode, setSearchMode] = useState(false);
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
              <Link to="/dashboard" className="shopcart">
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
      <div className={searchMode ? "search on" : "search off"}>
        {searchMode && (
          <ul>
            {searchedItems.map((el) => {
              // MAKE THEM LINKS OR PUT WHOLE SEARH IN CATEGORY
              // AND WHEN YOU SEARCH CLICK ACCEPT AS FILTER
              // AND FILTER THE ITEMS SO THE DOUBLSIDE CARD WORKS
              return <li>{el.title}</li>;
            })}
          </ul>
        )}
      </div>
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
