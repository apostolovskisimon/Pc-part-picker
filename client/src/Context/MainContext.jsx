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
        });
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("USER")) {
      loginUser();
    }
  }, []);

  // useEffect(() => {
  //   if (user.length > 3) {
  //     localStorage.setItem("userLoggedIn", user);
  //   }
  // }, [user]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const sharedValue = {
    showLoginForm,
    setShowLoginForm,
    showSignupForm,
    setShowSignupForm,
    loggedIn,
    setLoggedIn,
    user,
    setUser,
  };
  return (
    <PeriodicContext.Provider value={sharedValue}>
      {props.children}
    </PeriodicContext.Provider>
  );
};
