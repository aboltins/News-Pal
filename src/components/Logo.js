import React from "react";
import logoImg from "../styles/images/nplogo1.png";
import styles from "../styles/header.module.css";

const Logo = () => {
  return (
    <div>
      <img src={logoImg} alt="Logo" className={styles.logoImg} />
    </div>
  );
};

export default Logo;