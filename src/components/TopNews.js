import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

const TopNews = () => {
  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    // const apiKey = process.env.REACT_APP_API_KEY_GUARDIAN;
    // console.log(process.env.REACT_APP_API_KEY_GUARDIAN);

    // enter key below for now, until process.env is resolved.
    const apiKey = '';
    // guardian api, up to 20 articles with thumbnail photos
    const Url = `https://content.guardianapis.com/search?api-key=${apiKey}&show-fields=thumbnail&page-size=20`;
    
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
          // this will only show the top news that have an image
          news.fields && news.fields.thumbnail && (
            <ListGroup.Item key={news.id}>
              <Card>
                <Card.Img variant="top" src={news.fields.thumbnail} />
                <Card.Body>
                  <Card.Title>{news.webTitle}</Card.Title>
                  <Card.Text>{news.webPublicationDate}</Card.Text>
                  <Card.Link href={news.webUrl}>Read more on Guardian</Card.Link>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          )
        ))}
      </ListGroup>
    </div>
  );
};

export default TopNews;