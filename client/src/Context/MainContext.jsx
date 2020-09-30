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
  const [allActive, setAllActive] = useState(true);

  const handleActiveCateogry = (id) => {
    if (id === "All") {
      setAllActive(true);
      setActiveCategory("All");
      setCategorizedItems(itemList);
    } else {
      const filteredItems = itemList.filter((el) => el.category === id);
      setActiveCategory(filteredItems[0].category);
      setCategorizedItems(filteredItems);
    }
  };
  console.log(activeCategory);
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

  const handleDeleteItem = async (id) => {
    console.log(id);
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
  console.log("buyed>>>", buyedItem);

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
