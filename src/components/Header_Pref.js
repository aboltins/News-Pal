import React from "react";
import Clock from "../components/Clock";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import styles from "../styles/header.module.css";
import { Button } from "react-bootstrap";

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
        <Button variant="outline-primary">
          <Link to="/" className={styles.logout}>Logout</Link>
        </Button>
      </div>
    </header>
  );
}

export default Header;