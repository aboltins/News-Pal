import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useUserAuth } from "../components/UserAuthContext";
import { updateProfile } from "firebase/auth";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  let name;
  const ref = useRef([]);

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

  async function addEntry() {
    const id = user ? user.uid : "unknown";
    const ownerEmail = user ? user.email : "unknown";
    let userPref = tempUserPref;

    for (let i = 0; i < ref.current.length; i++) {
      ref.current[i].checked = false;
    }

    if (firstName === "" && lastName === "") {
      setError("Please enter a name.");
      return;
    } else if (firstName === "") {
      setError("Please enter a first name.");
      return;
    } else if (lastName === "") {
      setError("Please enter a last name.");
      return;
    } else if (userPref.length === 0) {
      setError("Please choose atleast one preference.");
      return;
    } else {
      name = `${firstName} ${lastName}`;
    }

    const newEntry = {
      name: name,
      userPref: userPref,
      id: id,
      owner: uuidv4(),
      ownerEmail,
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    try {
      const userNewsRef = doc(colletionRef, newEntry.id);
      await setDoc(userNewsRef, newEntry);
      updateProfile(user, {
        displayName: name,
      })
        .then(() => {
          navigate("/usernewsfeed");
        })
        .catch((error) => {
          console.log(error);
        });
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
                  Create Profile
                </h2>
                {error && (
                  <Alert className="text-center" variant="danger">
                    {error}
                  </Alert>
                )}
                <Form>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter first name"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter last name"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <h4 className="mb-3 text-center text-capitalize">
                      {" "}
                      News Preferences
                    </h4>
                    <Col>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      name="World"
                      label="World"
                      ref={(element) => {
                        ref.current[0] = element;
                      }}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                    <Form.Check
                      type="checkbox"
                      name="Politics"
                      label="Politics"
                      ref={(element) => {
                        ref.current[1] = element;
                      }}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                    <Form.Check
                      type="checkbox"
                      name="Sport"
                      label="Sport"
                      ref={(element) => {
                        ref.current[2] = element;
                      }}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                    <Form.Check
                      type="checkbox"
                      name="Football"
                      label="Football"
                      ref={(element) => {
                        ref.current[3] = element;
                      }}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                    <Form.Check
                      type="checkbox"
                      name="Technology"
                      label="Technology"
                      ref={(element) => {
                        ref.current[4] = element;
                      }}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      name="Food"
                      label="Food"
                      ref={(element) => {
                        ref.current[5] = element;
                      }}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                    <Form.Check
                      type="checkbox"
                      name="UK-News"
                      label="UK-News"
                      ref={(element) => {
                        ref.current[6] = element;
                      }}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                    <Form.Check
                      type="checkbox"
                      name="US-News"
                      label="US-News"
                      ref={(element) => {
                        ref.current[7] = element;
                      }}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                    <Form.Check
                      type="checkbox"
                      name="Business"
                      label="Business"
                      ref={(element) => {
                        ref.current[8] = element;
                      }}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                    <Form.Check
                      type="checkbox"
                      name="Environment"
                      label="Environment"
                      ref={(element) => {
                        ref.current[9] = element;
                      }}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                  </Form.Group>
                </Col>
                    <div className="d-grid gap-2">
                      <Button variant="success" onClick={() => addEntry()}>
                        Submit profile
                      </Button>
                    </div>
                  </Row>
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
