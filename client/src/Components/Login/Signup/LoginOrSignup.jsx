import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { PeriodicContext } from "../../../Context/MainContext";
import "./LoginOrSignup.css";
const LoginOrSignup = () => {
  let history = useHistory();
  const {
    showLoginForm,
    setShowLoginForm,
    showSignupForm,
    setShowSignupForm,
    loggedIn,
    setLoggedIn,
    user,
    setUser,
  } = useContext(PeriodicContext);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const CreateAccount = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;
    const newUser = {
      displayName,
      email,
      password,
    };
    await axios
      .post("http://localhost:5000/users/add", newUser, {
        signal: signal,
      })
      .then(() => {
        setDisplayName("");
        setEmail("");
        setPassword("");
        history.push("/");
      })
      .catch((err) => console.log(err));

    return () => {
      abortController.abort();
    };
  };

  const LogIn = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;
    const userLoggingIn = {
      email,
      password,
    };
    await axios
      .post("http://localhost:5000/users/login", userLoggingIn, {
        signal: signal,
      })
      .then((res) => {
        console.log(res.data);
        setDisplayName("");
        setEmail("");
        setPassword("");
        setLoggedIn(true);
        setUser(res.data);
        history.push("/");
      })
      .catch((err) => console.log(err));

    return () => {
      abortController.abort();
    };
  };

  return (
    <React.Fragment>
      <div className="anim">
        <div className="form-box">
          {!showSignupForm ? (
            <form onSubmit={(e) => CreateAccount(e)}>
              <p>SIGN UP FORM</p>
              <input
                type="text"
                placeholder="Display Name"
                required
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <input
                type="email"
                placeholder="E-Mail"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Create Account</button>
            </form>
          ) : (
            <form onSubmit={(e) => LogIn(e)}>
              <p>LOG IN FORM</p>
              <input
                type="email"
                placeholder="E-Mail"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Log In</button>
            </form>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginOrSignup;
