import React from "react";
import Clock from "../components/Clock";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import styles from "../styles/header.module.css";

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Clock className={styles.clock}/>
        <div className={styles.login}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;