import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useUserAuth } from "../components/UserAuthContext";
import db from "../config/Firebase";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import styles from "../styles/Form.module.css";
import Header from "../components/Header_Pref";
import Footer from "../components/Footer";

export default function UserFirstTime() {
  const tempUserPref = [];
  const { user } = useUserAuth();
  const colletionRef = collection(db, "User_News_Prefrences");
  const navigate = useNavigate();

  function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  const handleClick = (e) => {
    if (e.target.checked && tempUserPref.includes(e.target.name) === false) {
      tempUserPref.push(e.target.name);
      console.log(tempUserPref);
    } else if (
      e.target.checked === false &&
      tempUserPref.includes(e.target.name) === true
    ) {
      removeItem(tempUserPref, e.target.name);
      console.log(tempUserPref);
    }
  };

  async function addSchool() {
    const owner = user ? user.uid : "unknown";
    const ownerEmail = user ? user.email : "unknown";
    let userPref = tempUserPref;

    const newEntry = {
      userPref: userPref,
      id: uuidv4(),
      owner,
      ownerEmail,
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    try {
      const userNewsRef = doc(colletionRef, newEntry.id);
      await setDoc(userNewsRef, newEntry);
      navigate("/userprofile");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className={styles.height}>
      <Header />
      <div className={styles.display}>
        <Container>
          <Row className={styles.row}>
            <Col>
              <div className={styles.box}>
                <h2 className="mb-3 text-center text-capitalize">
                  {" "}
                  News Preferences
                </h2>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label>News Preferences</Form.Label>
                    <Form.Check
                      type="checkbox"
                      name="World news"
                      label="World news"
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                    <Form.Check
                      type="checkbox"
                      name="Politics"
                      label="Politics"
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                    <Form.Check
                      type="checkbox"
                      name="Sport"
                      label="Sport"
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                    <Form.Check
                      type="checkbox"
                      name="Environment"
                      label="Environment"
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="success" onClick={() => addSchool()}>
                      Submit preferences
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </section>
  );
}
