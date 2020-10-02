import React from "react";
import "./Footer.css";

// send e-mails to server
const Footer = () => {
  return (
    <footer>
      <div className="footer-overlay">
        <h3>If you have any questions, requests or bug reports e-mail us</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input type="email" placeholder="Your E-Mail" required />
          <textarea
            name=""
            id=""
            cols="30"
            rows="4"
            placeholder="Your Text"
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <p className="created">Personal project created by Simon Apostolovski</p>
    </footer>
  );
};

export default Footer;
