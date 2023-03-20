import React, { useState } from "react";
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

const UserPage = () => {
  const { user } = useUserAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  let photo;
  let name;
  if (user.photoURL === null) {
    photo =
      "https://static.hudl.com/users/prod/5499830_8e273ea3a64448478f1bb0af5152a4c7.jpg";
  } else {
    photo = user.photoURL;
  }

  if (user.displayName === null) {
    name = "NewsPal User";
  } else {
    name = user.displayName;
  }

  const auth = getAuth();
  updateProfile(auth.currentUser, {
    photoURL: photo,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (firstName === '' && lastName === '') {
      name = user.displayName
    }
    try {
      console.log("this is a test");
      if (firstName === '' && lastName === '') {
        name = user.displayName
      } else if (firstName === '') {
        setError('Please enter a first name.')
        return
      } else if (lastName === '') {
        setError('Please enter a last name.')
        return
      } else {
        name = `${firstName} ${lastName}`;
        console.log(name);
      }
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      })
        .then(() => {
          window.location.reload();
          console.log("profile updated");
        })
        .catch((errorUP) => {
          console.log(errorUP);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Card className="col-lg-4 col-sm-12">
            <img
              src={photo}
              style={{ width: "96px", height: "96px" }}
              alt="User's profile pic"
            ></img>
            Hello Welcome {name}
            <br />
          </Card>
          <div
            className="col-lg-8 col-sm-12"
            style={{
              border: "1px solid #dfdfdf",
              backgroundColor: "#fff",
              padding: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <h2 className="mb-3 text-center text-capitalize"> Update Profile</h2>
            {error && (
              <Alert className="text-center" variant="danger">
                {error}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
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
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Label>News Preferences</Form.Label>
                  <Form.Check type="checkbox" label="World news" />
                  <Form.Check type="checkbox" label="Politics" />
                  <Form.Check type="checkbox" label="Sport" />
                  <Form.Check type="checkbox" label="Environment" />
                </Form.Group>
              </Row>
              <div className="d-grid gap-2">
                <Button variant="success" type="Submit">
                  Update Profile
                </Button>
              </div>
            </Form>
          </div>
        </Row>
      </Container>
      <Link to="/">Log Out</Link>
    </>
  );
};

export default UserPage;
