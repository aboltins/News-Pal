import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

const TopNews = () => {
  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    // const apiKey = process.env.REACT_APP_API_KEY_GUARDIAN;
    // console.log(process.env.REACT_APP_API_KEY_GUARDIAN);

    // enter key below for now, until process.env is resolved.
    const apiKey = '';
    const Url = `https://content.guardianapis.com/search?api-key=${apiKey}`;

    fetch(Url)
      .then((response) => response.json())
      .then((data) => setTopNews(data.response.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Top News</h2>
      <ListGroup>
        {topNews.map((news) => (
          <ListGroup.Item key={news.id}>
            <Card>
              <Card.Body>
                <Card.Title>{news.webTitle}</Card.Title>
                <Card.Text>{news.webPublicationDate}</Card.Text>
                <Card.Link href={news.webUrl}>Read more</Card.Link>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TopNews;