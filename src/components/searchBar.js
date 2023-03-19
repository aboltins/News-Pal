import { useState, useEffect } from "react";
import "../styles/SearchBar.css"
const API_KEY = 'be2ad656-3350-4f96-b3d1-d5329e39a5ed'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  function toggleSearch() {
    setIsActive(!isActive);
  }

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchInput("");
  };

  const fetchApiData = async () => {
    const response = await fetch(`https://content.guardianapis.com/search?q=${query}&api-key=${API_KEY}`);
    const data = await response.json();
    setData(data.response.results);
  };
  
  useEffect(() => {
    fetchApiData();
  }, [query, fetchApiData]);

  return (
    <div className="container">
      <div className={`search ${isActive ? "active" : ""}`}>
        <div className={`icon ${isActive ? "active" : ""}`} onClick={toggleSearch}></div>
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
      {query !== "" && (
        <div>
          {data.map((result) => (
            <div key={result.id}>
              <h2>{result.webTitle}</h2>
              <p>{result.webUrl}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
