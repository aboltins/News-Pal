import React from "react";
import Clock from "../components/Clock";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div className="header">
                <Logo/>
                <Clock />
                <div className="login">
                    <Link to="/login">Login</Link>
                    <Link to="/Signup">Sign Up</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;