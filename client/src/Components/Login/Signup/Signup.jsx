import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginOrSignup.css";
const Signup = () => {
  let history = useHistory();

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
        history.push("/login");
      })
      .catch((err) => console.log(err));

    return () => {
      abortController.abort();
    };
  };

  return (
    <div className="signupCover">
      <div className="anim signupform">
        <form onSubmit={(e) => CreateAccount(e)}>
          <p>SIGN UP</p>
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
      </div>
    </div>
  );
};

export default Signup;
