import React, { useState } from "react";
import styles from "../styles/SearchBar.css";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isActive, setIsActive] = useState(false);

  function toggleSearch() {
    setIsActive(!isActive);
  }

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleClear = () => {
    document.getElementById("mysearch").value = "";
  };

  return (
    <div className="container">
      <div className={`search ${isActive ? "active" : ""}`}>
        <div
          className={`icon ${isActive ? "active" : ""}`}
          onClick={toggleSearch}
        ></div>
        <input
          id="mysearch"
          className="input"
          type="search"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput}
        />
        <span className="clear" onClick={handleClear}></span>
      </div>
    </div>
  );
};

export default SearchBar;
