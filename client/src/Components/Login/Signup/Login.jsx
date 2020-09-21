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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        setUser({
          displayName: res.data.displayName,
          email: res.data.email,
        });
        const saveUser = {
          displayName: res.data.displayName,
          email: res.data.email,
          password: res.data.password,
        };
        localStorage.setItem("USER", JSON.stringify(saveUser));
        setLoggedIn(true);
        setEmail("");
        setPassword("");
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });

    return () => {
      abortController.abort();
    };
  };

  return (
    <React.Fragment>
      <div className="anim">
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
      </div>
    </React.Fragment>
  );
};

export default LoginOrSignup;