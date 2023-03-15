import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import { useUserAuth } from "../components/UserAuthContext";
import styles from "../styles/Login.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
      if (err.message === 'Firebase: Error (auth/invalid-email).') {
        setError('Please enter a valid email address.');
      } else if (err.message === 'Firebase: Error (auth/internal-error).') {
        setError('Please enter a valid password.')
      } else if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        setError('Password should be at least 6 characters !')
      } else {
        setError('You have entered an invalid email or password !');
      }
    }
  };

  return (
    <section className={styles.display}>
      <Container>
        <Row>
          <Col>
            <div className={styles.box}>
              <h2 className="mb-3 text-center text-capitalize"> Sign-up</h2>
              {error && <Alert className="text-center" variant="danger">{error}</Alert>}
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
                  <Button variant="warning" type="Submit">
                    Sign up
                  </Button>
                </div>
              </Form>
            </div>
            <div className={styles.box2}>
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Signup;
