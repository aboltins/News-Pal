import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../styles/Login.module.css";

const Signup = () => {
  return (
    <section className={styles.display}>
      <Container>
        <Row>
          <Col>
            <div className={styles.box}>
              <h2 className="mb-3 text-center text-capitalize"> Sign-up</h2>
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
