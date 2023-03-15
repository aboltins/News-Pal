import React from "react";
import Weather from "../components/Weather";
import Clock from "../components/Clock";
import Logo from "../components/Logo";

const Header = () => {
    return (
        <header>
            <div className="header">
                <Logo />
                <Weather />
                <Clock />
            </div>
        </header>
    );
};

export default Header;