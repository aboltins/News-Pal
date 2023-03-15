import React from "react";
import SearchBar from "../components/SearchBar";
import Weather from "../components/Weather";

const Home = () => {
  return (
    <div>
      Home page
      <SearchBar />
      <Weather />
    </div>
  );
};

export default Home;
