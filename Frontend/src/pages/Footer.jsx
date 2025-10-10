import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f1f1f1",
      }}
    >
      <p>@ 2025 Sawari Sewa. All rights reserved.</p>
      <p>
        Powered by{" "}
        <a href="https://github.com/khatiwadaroshan">Roshan Khatiwada</a>
      </p>
      <p>
        <Link to={"/PrivacyPolicy"}>PrivacyPolicy | </Link>
        <Link to={"/TermsofServices"}>Terms of Services</Link>
      </p>
    </div>
  );
};

export default Footer;
