import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../components/UserAuthContext";
import styles from "../styles/Login.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/userpage");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      if (err.message === "Firebase: Error (auth/invalid-email).") {
        setError("Please enter a valid email address.");
      } else if (err.message === "Firebase: Error (auth/internal-error).") {
        setError("Please enter a valid password.");
      } else {
        setError("You have entered an invalid email or password !");
      }
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/userpage");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className={styles.height}>
      <Header />
      <div className={styles.display}>
        <Container>
          <Row className={styles.row}>
            <Col>
              <div className={styles.box}>
                <h2 className="mb-3 text-center text-capitalize"> Login</h2>
                {error && (
                  <Alert className="text-center" variant="danger">
                    {error}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="success" type="Submit">
                      Log In
                    </Button>
                  </div>
                </Form>
                <hr />
                <div>
                  <GoogleButton
                    className="g-btn"
                    type="dark"
                    onClick={handleGoogleSignIn}
                  />
                </div>
              </div>
              <div className={styles.box2}>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </section>
  );
};

export default Login;
