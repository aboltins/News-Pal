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
          <Link to="/" className={styles.logoLink}>
            <Logo />
          </Link>
        </div>
        <Clock className={styles.clock} />
        <div className={styles.login}>
          <Link to="/login" className={styles.loginBtn}>Login</Link>
          <Link to="/signup" className={styles.signupBtn}>Sign Up</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;