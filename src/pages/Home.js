import React from "react";
import SearchBar from "../components/searchBar";
import Weather from "../components/Weather";
import TopNews from "../components/TopNews";

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <SearchBar />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <Weather />
        </div>
        <div className="col-md-9">
          <h2 className="mb-4">TOP News</h2>
          <TopNews />
        </div>
      </div>
    </div>
  );
};

export default Home;