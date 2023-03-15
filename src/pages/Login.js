import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import styles from "../styles/Login.module.css";

const Login = () => {
  return (
    <section className={styles.display}>
      <Container>
        <Row>
          <Col>
            <div className={styles.box}>
              <h2 className="mb-3 text-center text-capitalize"> Login</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
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
                />
              </div>
            </div>
            <div className={styles.box2}>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
