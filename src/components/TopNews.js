import React, { useEffect, useState } from "react";
import { Card, ListGroup, Col, Row } from "react-bootstrap";
import styles from "../styles/TopNews.module.css";

const TopNews = () => {
  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    // const apiKey = process.env.REACT_APP_API_KEY_GUARDIAN;
    // console.log(process.env.REACT_APP_API_KEY_GUARDIAN);

    // enter key below for now, until process.env is resolved.
    const apiKey = 'be2ad656-3350-4f96-b3d1-d5329e39a5ed';
    // guardian api, up to 20 articles with thumbnail photos
    const Url = `https://content.guardianapis.com/world?api-key=${apiKey}&show-fields=thumbnail&page-size=20`;    
    fetch(Url)
      .then((response) => response.json())
      .then((data) => setTopNews(data.response.results))
      .catch((error) => console.log(error));
  }, []);

  // slice cuts the array to get a certain number of news stories with images, as it renders 20 but not all of them will have images.
  const newsWithImages = topNews.filter(news => news.fields && news.fields.thumbnail).slice(0, 12);

  return (
    <div className={styles.TopNewsContainer}>
      <h2 className={styles.TopNewsTitle}>Latest Headlines</h2>
      <Row xs={1} sm={2} md={3} xl={4}>
        {/* this maps over the newly created newWithImages */}
        {newsWithImages.map((news) => (
          <Col key={news.id}>
            <ListGroup.Item>
              <Card>
                <Card.Img variant="top" src={news.fields.thumbnail} />
                <Card.Body>
                  <Card.Title>{news.webTitle}</Card.Title>
                  {/* replaces the T and Z that was given by guardian api on the dates with empty spaces */}
                  <Card.Text>{news.webPublicationDate.replace('T', ' ').replace('Z', '')}</Card.Text>
                  <Card.Link href={news.webUrl}>Read more on Guardian</Card.Link>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TopNews;