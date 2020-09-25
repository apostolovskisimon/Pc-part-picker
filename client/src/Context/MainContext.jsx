import Axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const PeriodicContext = createContext();

export const PeriodicProvider = (props) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    id: "",
    cart: [],
  });

  const loginOnServer = async () => {
    await Axios.get(
      `http://localhost:5000/users/${
        JSON.parse(localStorage.getItem("USER")).email
      }`
    )
      .then((res) => {
        setUser({
          displayName: res.data.displayName,
          email: res.data.email,
          id: res.data._id,
          cart: res.data.cart,
        });
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  const [itemList, setItemList] = useState([]);

  const handleAddToCart = async (id) => {
    const itemToAdd = itemList.filter((el) => el.id === id);
    await Axios.post(
      `http://localhost:5000/users/addToCart/${user.email}`,
      itemToAdd
    )
      .then((res) => {
        console.log(res.data);
        if (typeof res.data == "string") {
          return;
        } else {
          setUser({ ...user, cart: res.data });
        }
      })
      .catch((err) => console.log(err));
  };
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("USER")) {
      loginOnServer();
    } else {
      setLoggedIn(false);
    }

    Axios.get("http://localhost:5000/items/")
      .then((res) => {
        setItemList(res.data);
        setPopularItems(
          res.data.sort(() => Math.random() - Math.random()).slice(0, 3)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [categorizedItems, setCategorizedItems] = useState([]);
  const handleActiveCateogry = (id) => {
    if (id === "All") {
      setCategorizedItems(itemList);
    } else {
      const filteredItems = itemList.filter((el) => el.category === id);
      setActiveCategory(filteredItems[0].category);
      setCategorizedItems(filteredItems);
    }
  };

  const [searchedItems, setSearchedItems] = useState([]);

  // vidi za search
  const handleSearch = (query) => {
    if (query !== "") {
      const searchedThrough = itemList.filter((el) =>
        el.title.toLowerCase().includes(query.toLowerCase())
      );
      setCategorizedItems(searchedThrough);
    } else {
      setCategorizedItems(itemList);
    }
  };

  const [searchMode, setSearchMode] = useState(false);
  console.log(searchedItems);
  useEffect(() => {}, [user]);
  const sharedValue = {
    showLoginForm,
    setShowLoginForm,
    showSignupForm,
    setShowSignupForm,
    loggedIn,
    setLoggedIn,
    user,
    setUser,
    popularItems,
    handleAddToCart,
    itemList,
    setItemList,
    handleActiveCateogry,
    categorizedItems,
    setCategorizedItems,
    activeCategory,
    handleSearch,
    searchedItems,
    searchMode,
    setSearchMode,
  };
  return (
    <PeriodicContext.Provider value={sharedValue}>
      {props.children}
    </PeriodicContext.Provider>
  );
};
