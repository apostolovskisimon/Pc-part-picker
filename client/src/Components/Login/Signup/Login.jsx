import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { PeriodicContext } from "../../../Context/MainContext";
import "./LoginOrSignup.css";
const LoginOrSignup = () => {
  let history = useHistory();
  const { setLoggedIn, setUser } = useContext(PeriodicContext);

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
        const saveUser = {
          displayName: res.data.displayName,
          email: res.data.email,
          password: res.data.password,
          id: res.data._id,
          cart: res.data.cart,
        };
        setUser({
          displayName: saveUser.displayName,
          email: saveUser.email,
          id: saveUser._id,
          cart: saveUser.cart,
        });

        localStorage.setItem("USER", JSON.stringify(saveUser));
        setLoggedIn(true);
        setEmail("");
        setPassword("");
        history.push("/");
        window.location.reload();
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
      <div className="loginbox">
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
