import React, { useState, useEffect } from "react";
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
import cogoToast from "cogo-toast";

function LoginPage(props: any) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const { isAuthenticated, setUserHasAuthenticated } = props.appProps;
  function handleChange(event: any) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }
  useEffect(() => {
    setRedirect(isAuthenticated)
  }, [isAuthenticated])

  function handleSubmit(event: any) {
    event.preventDefault();
    setValues({ email: "", password: "" });
  }
  function submit() {
    if (values.email.length === 0 || values.password.length === 0) {
      cogoToast.error("Please fill in both your email adress and password.", {
        position: "top-center",
        hideAfter: 5
      });
      return;
    } else {
      axios.post("http://localhost:8081/logIn", values).then(
        response => {
          if (response.status === 200) {
            let userLog = JSON.stringify(response.data);
            localStorage.setItem("user", userLog);
            validateRole(response.data.role);
          } else if (response.status === 403) {
            cogoToast.success("Incorrect username or password", {
              hideAfter: 5
            });
            console.log(response.status);
          }
        },
        error => {
          cogoToast.error("Incorrect username or password", {
            position: "top-center",
            hideAfter: 5
          });
          console.log(error);
        }
      );
    }
  }
  function validateRole(role: any) {
    switch (role) {
      case "[admin]":
        setUserHasAuthenticated(true);
        //history.push("/dashboard");
        cogoToast.success("Yay, you're logged in.", { hideAfter: 5 });
        break;
      case "[approved user]":
        setUserHasAuthenticated(true);
        //history.push("/dashboard");
        cogoToast.success("Yay, you're logged in.", { hideAfter: 5 });
        break;
      case "[pending user]":
        cogoToast.warn("Your account request is pending approval.", {
          hideAfter: 5
        });
        break;
      case "[blocked user]":
        cogoToast.error("Your account is blocked for the moment.", {
          hideAfter: 5
        });
        break;
      default:
        cogoToast.error("Something is off, please try again.");
    }
  }
  if (redirect) {
    console.log("heei redirecti" + redirect)
    history.push("/dashboard")
    //return <Redirect to='/dashboard' />  
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
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={handleChange}
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
