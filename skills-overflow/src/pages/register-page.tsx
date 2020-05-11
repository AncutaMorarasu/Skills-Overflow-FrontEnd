import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
//git import Modal from 'react-modal';

function RegisterPage() {
<<<<<<< HEAD
  const [values, setValues] = useState({ email: "", userName: "", password: "", secPassword: "" });
  const [check, setCheck] = useState(true);
=======
  const [values, setValues] = useState({
    email: "",
    userName: "",
    password: "",
    secPassword: ""
  });
>>>>>>> 5a6884529fc942364b84991f7ce160fed20ab373

  function handleChange(event: any) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    axios.post("http://localhost:8080/singUp", values).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    setValues({ email: "", userName: "", password: "", secPassword: "" });
  }

  function checkRegister(event: any){
    axios.get("http://localhost:8080/singUp")
  }

  function submit() {
    if (!(values.password.localeCompare(values.secPassword)) === false) {
      alert("Passwords do not match.");
    }else if(values.password.length === 0 || values.secPassword.length === 0){
      alert("Please insert a valid password.");
    }
    console.log(values);
  }

  function checkBox(check: boolean){
    if(check){
      setCheck(false);
    }else{
      setCheck(true);
    }
    console.log(check);
}

  return (
    <div className="container">
      <h1>Welcome to Skills Overflow</h1>
      <Container className="formRegisterContainer">
        <h2 className="border-bottom">Register</h2>
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
              required
            />
          </Form.Group>
          <div className="custom-control custom-checkbox">
<<<<<<< HEAD
            <input type="checkbox" className="custom-control-input" id="defaultUnchecked" />
            <label className="custom-control-label" htmlFor="defaultUnchecked" onClick={()=>checkBox(check)}>I accept the terms and conditions</label>
=======
            <input
              type="checkbox"
              className="custom-control-input"
              id="defaultUnchecked"
            />
            <label className="custom-control-label" htmlFor="defaultUnchecked">
              I accept the terms and conditions
            </label>
>>>>>>> 5a6884529fc942364b84991f7ce160fed20ab373
          </div>
          <Button
            disabled={check}
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
