import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { PeriodicContext } from "../../Context/MainContext";
import "./navbar.css";
import logo from "../../Assets/Images/LogoMakr_2qC11y.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
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
  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link to="/" className="anchor">
            Home
          </Link>
          <Link to="/products" className="anchor">
            Products
          </Link>
          <Link to="" className="anchor">
            <FontAwesomeIcon icon={faSearch} className="searchicn" />
            <input
              type="search"
              placeholder="Search for an item"
              onChange={(e) => {
                handleSearch(e.target.value);
                setSearchMode(true);
                if (e.target.value === "") {
                  setSearchMode(false);
                }
              }}
            />
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
              {user.cart.length > 0 && (
                // LINK TO CART !
                <Link to="/dashboard" className="shopcart">
                  <FontAwesomeIcon icon={faCartPlus} className="shopIcon" />
                  {user.cart.length}
                </Link>
              )}
              <Link to="/dashboard">{user.displayName}</Link>
              <div className="cart-icon"></div>
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
    </React.Fragment>
  );
};

export default Navbar;
