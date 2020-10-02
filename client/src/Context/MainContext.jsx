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
    purchaseHistory: [],
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
          purchaseHistory: res.data.purchaseHistory,
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
        if (typeof res.data == "string") {
          return;
        } else {
          setUser({ ...user, cart: res.data });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (localStorage.getItem("USER")) {
      loginOnServer();
    } else {
      setLoggedIn(false);
    }

    Axios.get("http://localhost:5000/items/")
      .then((res) => {
        setItemList(res.data);
        setItemsToShow(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [categorizedItems, setCategorizedItems] = useState([]);
  const [allActive, setAllActive] = useState(true);

  const [itemsToShow, setItemsToShow] = useState([]);
  const [toggleCattegory, setToggleCategory] = useState(false);

  const handleActiveCateogry = (query) => {
    if (query === "All") {
      setItemsToShow(itemList);
      setToggleCategory(false);
    } else {
      setToggleCategory(true);
      setAllActive(false);
      const items = itemList.filter(
        (el) => el.category.toLowerCase() === query.toLowerCase()
      );
      setItemsToShow(items);
    }
  };

  // const [searchedItems, setSearchedItems] = useState([]);

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

  const handleDeleteItem = async (id) => {
    await Axios.post(`http://localhost:5000/users/deleteItem/${user.email}`, {
      id: id,
    })
      .then((res) => setUser({ ...user, cart: res.data }))
      .catch((err) => console.log(err));
  };

  const [buyMode, setBuyMode] = useState(false);
  const [buyedItem, setBuyedItem] = useState(undefined);

  const handleBuyItem = async (id, quantity) => {
    const itemToBuy = user.cart.find((el) => el.id === id);
    setBuyedItem({
      title: itemToBuy.title,
      category: itemToBuy.category,
      description: itemToBuy.description,
      id: itemToBuy.id,
      price: itemToBuy.price,
      quantity: parseInt(quantity),
      rating: itemToBuy.rating,
      ticketID: new Date().getTime(),
    });
    await Axios.post(`http://localhost:5000/users/buyItem/${user.email}`, {
      id: itemToBuy.id,
      quantity: parseInt(quantity),
    })
      .then((res) => {
        setUser({
          ...user,
          purchaseHistory: res.data.purchaseHistory,
          cart: res.data.cart,
        });
        setBuyMode(true);
      })
      .catch((err) => console.log(err));
  };

  const [searchMode, setSearchMode] = useState(false);

  const sharedValue = {
    showLoginForm,
    setShowLoginForm,
    showSignupForm,
    setShowSignupForm,
    loggedIn,
    setLoggedIn,
    user,
    setUser,
    toggleCattegory,
    setToggleCategory,
    handleAddToCart,
    itemList,
    setItemList,
    handleActiveCateogry,
    categorizedItems,
    setCategorizedItems,
    itemsToShow,
    setItemsToShow,
    activeCategory,
    handleSearch,
    searchMode,
    setSearchMode,
    allActive,
    setAllActive,
    handleDeleteItem,
    handleBuyItem,
    buyMode,
    setBuyMode,
    buyedItem,
    setBuyedItem,
  };
  return (
    <PeriodicContext.Provider value={sharedValue}>
      {props.children}
    </PeriodicContext.Provider>
  );
};
