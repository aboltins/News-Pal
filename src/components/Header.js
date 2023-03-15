import React from "react";
import Weather from "../components/Weather";
import Clock from "../components/Clock";

const Header = () => {
    return (
        <header>
            <div className="header">
                <h1>News Pal</h1>
                <Weather />
                <Clock />
            </div>
        </header>
    );
};

export default Header;