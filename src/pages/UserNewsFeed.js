import React, { useEffect, useState } from "react";
import { useUserAuth } from "../components/UserAuthContext";
import db from "../config/Firebase";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import styles from "../styles/UserNewsFeed.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
// save key in configGuardian.js for now, until process.env is resolved.
import { apiKeyGuardian } from '../config/configGuardian.js';

function UserNewsFeed() {
  const { user } = useUserAuth();
  let name;
  const [pref, setPref] = useState([]);
  const [articles, setArticles] = useState([]);


  const colletionRef = collection(db, "User_News_Prefrences");

  if (user.displayName === null) {
    name = "NewsPal User";
  } else {
    name = user.displayName;
  }

  useEffect(() => {
    const id = user ? user.uid : "unknown";
    const q = query(colletionRef, where("id", "==", id));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPref(items);
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userPreferences = pref.length > 0 ? pref[0].userPref : [];

      const promises = userPreferences.map(async (pref) => {
        const lowerCasePref = pref.toLowerCase();
        const url = `https://content.guardianapis.com/${lowerCasePref}?api-key=${apiKeyGuardian}&show-fields=thumbnail&page-size=20`;
        const response = await fetch(url);
        const json = await response.json();
        const results = json.response.results;
        const resultsWithImages = results.filter((news) => news.fields && news.fields.thumbnail);
        const firstTwelveResults = resultsWithImages.slice(0, 12);
        return firstTwelveResults.map((article) => ({ ...article, sectionName: lowerCasePref }));
      });

      const results = await Promise.all(promises);

      // the below flattens the array of arrays into single array of articles
      // concatenates all sub-arrays into a single, one-dimensional array.
      const articles = results.flat();
      setArticles(articles);
    };

    fetchData();
  }, [pref, apiKeyGuardian]);

  const userPreferences = pref.length > 0 ? pref[0].userPref : [];

  return (
    <>
      <Header />
      <div className={styles.logOutContainer}>
        <Link to="/" className={styles.logOutButton}>Log Out</Link>
      </div>
      <div className={styles.TitleAndPrefContainer}>
        <h1 className={styles.NewsFeedTitle}>{name}'s News Feed</h1>
        <h3 className={styles.NewsPrefTitle}>News Preferences:</h3>
        <ul className={styles.NewsPrefList}>
          {userPreferences.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <div className={styles.UserNewsContainer}>
        <h2 className={styles.articlesHeader}>{articles.length > 0 && articles[0].sectionName}</h2>
        <ListGroup>
          <Row xs={2} sm={2} md={3} xl={4}>
            {articles.map((article) => (
              <Col key={article.id}>
                <ListGroup.Item>
                  <Card>
                    <Card.Img variant="top" src={article.fields.thumbnail} />
                    <Card.Body>
                      <Card.Title>{article.webTitle}</Card.Title>
                      <Card.Text>{article.webPublicationDate.replace('T', ' ').replace('Z', '')}</Card.Text>
                      <Card.Link href={article.webUrl}>Read more on Guardian</Card.Link>
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
              </Col>
            ))}
          </Row>
        </ListGroup>
      </div>
      <Footer />
    </>
  );
}
export default UserNewsFeed;
