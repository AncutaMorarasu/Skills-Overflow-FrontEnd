import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import PasswordRecPage from "../pages/password-rec-page";
import RegisterPage from "../pages/register-page";
import axios from "axios";
import Dashboard from "./dashboard-page";
// import { useRoutes, useRedirect } from "hookrouter";

function LoginPage() {
  const [values, setValues] = useState({ email: "", password: "" });
  function handleChange(event: any) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    setValues({ email: "", password: "" });
    axios.post("localhost:8080", values).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    history.push("/dashboard");
  }
  const history = useHistory();
  function submit() {
    console.log(values);
  }

  return (
    <div className="container">
      <h1>Welcome to Skills Overflow</h1>
      <Container className="formContainer">
        <h2 className="border-bottom">Log In</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
              minLength={5}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="loginBtn .btn-block"
            onClick={submit}
          >
            Submit
          </Button>{" "}
          <div className="flex-column ">
            <Link to="/recovery" className="help-links">
              Forgot your password?
            </Link>
            <Link to="/register" className="help-links">
              Don't have an account? Sign up here!
            </Link>
          </div>
          <Router>
            <Switch>
              <Route path="/recovery">
                <PasswordRecPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </Router>
        </Form>
      </Container>
    </div>
  );
}
export default LoginPage;
