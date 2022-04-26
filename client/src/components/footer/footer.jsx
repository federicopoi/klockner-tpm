import React from "react";
import LogoP from "./logoP.png";
import LogoG from "./logoG.png";
const Footer = () => {
  return (
    <footer className="footer bg-white">
      <img
        src={LogoP}
        width="100"
        height="40"
        className="d-inline-block align-top"
      />
      <img src={LogoG} height={40} className="d-inline-block align-top" />
    </footer>
  );
};
export default Footer;
