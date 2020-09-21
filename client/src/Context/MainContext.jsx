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
  });

  const loginUser = async () => {
    await Axios.post(
      "http://localhost:5000/users/login",
      JSON.parse(localStorage.getItem("USER"))
    )
      .then((res) => {
        console.log(res.data);
        setLoggedIn(true);
        const loggedINUSER = JSON.parse(localStorage.getItem("USER"));
        setUser({
          displayName: loggedINUSER.displayName,
          email: loggedINUSER.email,
          id: loggedINUSER._id,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  };

  const [itemList, setItemList] = useState([]);

  const handleAddToCart = async (id) => {
    const itemToAdd = itemList.filter((el) => el.id === id);
    console.log(itemToAdd);
    await Axios.post(
      `http://localhost:5000/users/addToCart/${user.email}`,
      itemToAdd
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // TO DO
  // FINISH UP CART
  // SEE WHY IT ISNT PUSHING CORRECTLY

  useEffect(() => {
    if (localStorage.getItem("USER")) {
      loginUser();
    }

    Axios.get("http://localhost:5000/items/")
      .then((res) => setItemList(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  // }, [itemList])

  useEffect(() => {
    console.log(user);
  }, [user]);
  console.log("itemlist e:", itemList);
  const sharedValue = {
    showLoginForm,
    setShowLoginForm,
    showSignupForm,
    setShowSignupForm,
    loggedIn,
    setLoggedIn,
    user,
    setUser,

    handleAddToCart,
    itemList,
    setItemList,
  };
  return (
    <PeriodicContext.Provider value={sharedValue}>
      {props.children}
    </PeriodicContext.Provider>
  );
};
