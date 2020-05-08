import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";

function RegisterPage() {
  const [values, setValues] = useState({ email: "", userName: "", password: "", secPassword: "" });

  function handleChange(event: any) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    setValues({ email: "", userName: "", password: "", secPassword: "" });
    Axios.post("localhost:8080", values).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  function submit() {
    console.log(values);

  }

  return (

    <div className="container">
      <h1>Welcome to Skills Overflow</h1>
        <Container className="formRegisterContainer">
          <h2 className="border-bottom">Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustomUsername">
              <Form.Control
                type="userName"
                placeholder="Enter your user name"
                name="userName"
                value={values.userName}
                onChange={handleChange}
              />
            </Form.Group>
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
                placeholder="Enter your password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                name="secPassword"
                value={values.secPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="defaultUnchecked" />
              <label className="custom-control-label" htmlFor="defaultUnchecked">I accept the terms and conditions</label>
            </div>
            <Button
              variant="primary"
              type="submit"
              className="loginBtn .btn-block"
              id="register-submit-btn"
              onClick={submit}
            >
              Register
          </Button>{" "}


          </Form>

        </Container>

    </div>


  );
}

export default RegisterPage;
