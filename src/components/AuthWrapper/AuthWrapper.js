import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuth } from "../../reducers/authSlice";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./AuthWrapper.css";
const Auth = () => {
  const dispatch = useDispatch();

  const { toggle } = useSelector((state) => state.auth);

  const handleToggleAuth = () => {
    dispatch(toggleAuth(toggle === "login" ? "register" : "login"));
  };
  const handleLogin = () => {};
  const handleRegister = () => {};
  return (
    <Container>
      <Row>
        <div
          className={`container ${
            toggle === "login" ? "" : "right-panel-active"
          }`}
        >
          <Col xs={12} md={6}>
            <div
              className={`form-container ${
                toggle === "login" ? "login-container" : "register-container"
              }`}
            >
              <Form>
                <h1>{toggle === "login" ? "Login " : "Create Account"}</h1>

                {toggle === "login" && (
                  <>
                    <Form.Control type="email" placeholder="Email" />
                    <Form.Control type="password" placeholder="Password" />
                    <Button variant="primary" onClick={handleLogin}>
                      Login
                    </Button>
                  </>
                )}

                {toggle === "register" && (
                  <>
                    <Form.Control type="text" placeholder="Name" />
                    <Form.Control type="email" placeholder="Email" />
                    <Form.Control type="password" placeholder="Password" />
                    <Button variant="primary" onClick={handleRegister}>
                      Register
                    </Button>
                  </>
                )}
              </Form>
            </div>
          </Col>
          <Col md={6}>
        
          
            <div
              className={`overlay-panel ${
                toggle === "login" ? "overlay-right" : "overlay-left"
              }`}
            >
              {toggle === "login" ? (
                <>
                  <h1>Hello,Movie Pal </h1>
                  <p>Enter details to register</p>
                </>
              ) : (
                <>
                  <h1>Welcome Back!</h1>
                  <p>Login to your account</p>
                </>
              )}
              <Button className="ghost" onClick={handleToggleAuth}>
                {toggle === "login" ? "Register" : "Login"}
              </Button>
            </div>
           
           
          </Col>

  
        </div>
      </Row>
    </Container>
  );
};

export default Auth;

