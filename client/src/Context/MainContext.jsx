import React, { createContext, useEffect, useState } from "react";

export const PeriodicContext = createContext();

export const PeriodicProvider = (props) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userLoggedIn")) {
      setUser(localStorage.getItem("userLoggedIn"));
    }
  }, []);

  useEffect(() => {
    if (user.length > 3) {
      localStorage.setItem("userLoggedIn", user);
    }
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
