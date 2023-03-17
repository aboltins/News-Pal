import React from "react";
import logoImg from "../images/nplogo1.png"; // replace with the path to your image
import styles from "../styles/header.module.css";

const Logo = () => {
  return (
    <div>
      <img src={logoImg} alt="Logo" className={styles.logoImg} />
    </div>
  );
};

export default Logo;