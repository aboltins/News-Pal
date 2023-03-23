import React from "react";
import Clock from "../components/Clock";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import styles from "../styles/header.module.css";

const Header_Prof_Feed = () => {
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
          <Link to="/userProfile" className={styles.loginBtn}>Profile</Link>
          <Link to="/usernewsfeed" className={styles.signupBtn}>Feed</Link>
        </div>
      </div>
    </header>
  );
}

export default Header_Prof_Feed;