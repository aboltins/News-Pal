import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../components/UserAuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import {
  Container,
  Row,
  Card,
  Col,
  Form,
  Alert,
  Button,
} from "react-bootstrap";
import {
  doc,
  onSnapshot,
  updateDoc,
  collection,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import db from "../config/Firebase";
import unknowuser from "../styles/images/Unknown-user.jpg";
import styles from "../styles/UserNewsFeed.module.css";
import Header from "../components/Header_Prof_Feed";
import Footer from "../components/Footer";

const UserProfile = () => {
  const { user } = useUserAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const tempUserPref = [];
  const colletionRef = collection(db, "User_News_Prefrences");
  const [pref, setPref] = useState([]);
  const ref = useRef([]);

  let photo = user.photoURL;
  if (user.photoURL === null) {
    photo = unknowuser;
  }

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

  // REALTIME GET FUNCTION
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
  let test = [];
  let name;
  if (pref.length > 0) {
    test = pref[0].userPref;
    name = pref[0].name;
  }

  const editPref = () => {
    const id = user ? user.uid : "unknown";
    const test = pref[0].userPref;
    let userPref = test;

    if (tempUserPref.length > 0) {
      userPref = tempUserPref;
      console.log(userPref);
    }

    setFirstName("");
    setLastName("");
    setError("");

    for (let i = 0; i < ref.current.length; i++) {
      ref.current[i].checked = false;
    }

    if (firstName === "" && lastName === "") {
      name = user.displayName;
    } else if (firstName === "") {
      setError("Please enter a first name.");
      return;
    } else if (lastName === "") {
      setError("Please enter a last name.");
      return;
    } else {
      name = `${firstName} ${lastName}`;
    }

    const updatedEntry = {
      name: name,
      userPref: userPref,
      lastUpdate: serverTimestamp(),
    };

    try {
      const userNewsRef = doc(colletionRef, id);
      updateDoc(userNewsRef, updatedEntry);
      updateProfile(user, {
        displayName: name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.height}>
    <Header />
      <div className={styles.logOutContainer}>
        <Link to="/" className={styles.logOutButton}>
          Log Out
        </Link>
      </div>
      <div className={styles.display}>
      <Container>
        <Row>
          <Card className={styles.card}>
            <img
              src={photo}
              className={styles.image}
              alt="User's profile pic"
            ></img>
            <p className={styles.text}>{name}'s Profile</p>
            <ul className={styles.newsText}>
              <p>News Preferences:</p>
              {test.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <br />
          </Card>
          <div
            className="col-lg-1"
          >
          </div> 
          <div
            className="col-lg-7 col-sm-12"
            style={{
              border: "1px solid #dfdfdf",
              backgroundColor: "#fff",
              padding: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <h2 className="mb-3 text-center text-capitalize">
              {" "}
              Update Profile
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
                      value={firstName}
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
                      value={lastName}
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
              </Row>
              <div className="d-grid gap-2">
                <Button variant="success" onClick={() => editPref()}>
                  Update Preferences
                </Button>
              </div>
            </Form>
          </div>
        </Row>
      </Container>
      </div>
      <Footer />
    </section>
  );
};

export default UserProfile;
