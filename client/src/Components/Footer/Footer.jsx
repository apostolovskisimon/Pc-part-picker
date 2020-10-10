import React from "react";
import "./Footer.css";
import axios from "axios";
import { useState } from "react";
// send e-mails to server
const Footer = () => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [showSucesss, setShowSuccess] = useState(false);
  return (
    <footer>
      <div className="footer-overlay">
        <h3>If you have any questions, requests or bug reports e-mail us</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await axios
              .post(`http://localhost:5000/infos/push/`, {
                email,
                text,
              })
              .then((res) => {
                if (res.data === "OK") {
                  setShowSuccess(true);
                }
              });
          }}
        >
          <input
            type="email"
            placeholder="Your E-Mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="4"
            placeholder="Your Text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button type="submit" className={showSucesss ? "msgSent" : "btnsend"}>
            {showSucesss ? "Message Received" : "Submit"}
          </button>
        </form>
      </div>
      <p className="created">Personal project created by Simon Apostolovski</p>
    </footer>
  );
};

export default Footer;
