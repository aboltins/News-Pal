import { useState, useEffect } from "react";
import { Card, ListGroup, Col, Row } from "react-bootstrap";
import "../styles/SearchBar.css"
 // enter key below for now, until process.env is resolved.
const API_KEY = ''

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
  };

  const handleClear = () => {
    setSearchInput("");
    setData([]);
    setQuery("");
  };

  const fetchApiData = async () => {
    if (query !== "") {
      const response = await fetch(
        `https://content.guardianapis.com/search?q=${query}&api-key=${API_KEY}&show-fields=thumbnail&page-size=8`
      );
      const data = await response.json();
      setData(data.response.results);
    }
  };

  useEffect(() => {
    if (query !== "") {
      fetchApiData();
    }
  }, [query]);

  const searchResultsWithImages = data.filter(
    (result) => result.fields && result.fields.thumbnail
  );

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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setQuery(searchInput);
            }
          }}
          value={searchInput}
        />
        <span className="clear" onClick={handleClear}></span>
      </div>
      {searchResultsWithImages.length > 0 && (
        <div className="search-results-container">
          <h2>Search Results</h2>
          <Row xs={1} sm={2} md={3} xl={4}>
            {searchResultsWithImages.map((result) => (
              <Col key={result.id}>
                <ListGroup.Item>
                  <Card>
                    <Card.Img variant="top" src={result.fields.thumbnail} />
                    <Card.Body>
                      <Card.Title>{result.webTitle}</Card.Title>
                      <Card.Text>{result.webPublicationDate.replace('T', ' ').replace('Z', '')}</Card.Text>
                      <Card.Link href={result.webUrl}>Read more on Guardian</Card.Link>
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default SearchBar;