import React from "react";
import SearchBar from "../components/searchBar";
import Weather from "../components/Weather";
import TopNews from "../components/TopNews";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
    <Header />
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
          <TopNews />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Home;