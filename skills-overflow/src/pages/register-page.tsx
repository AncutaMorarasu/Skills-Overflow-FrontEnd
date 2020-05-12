import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import cogoToast from 'cogo-toast';
import { useHistory } from "react-router-dom";

<<<<<<< HEAD
function RegisterPage() {
  const [values, setValues] = useState({ email: "", userName: "", password: "", secPassword: "" });
  const [check, setCheck] = useState(true);
=======

export default function RegisterPage() {
  const [values, setValues] = useState({ email: "", userName: "", password: "", secPassword: "", backValue: "email or username already taken" });
  const [check, setCheck] = useState(true);
  const history = useHistory();
>>>>>>> finalStage

  function handleChange(event: any) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  function handleSubmit(event: any) {
    //de rezolvat
    event.preventDefault();
<<<<<<< HEAD
    axios.post("http://localhost:8080/signUp", values).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    setValues({ email: "", userName: "", password: "", secPassword: "" });
  }

  function checkRegister(event: any) {
    axios.get("http://localhost:8080/singUp");
  }

  function submit() {
    if (!values.password.localeCompare(values.secPassword) === false) {
      alert("Passwords do not match.");
    } else if (
      values.password.length === 0 ||
      values.secPassword.length === 0
    ) {
      alert("Please insert a valid password.");
=======
    console.log(values);
    setValues({ email: "", userName: "", password: "", secPassword: "", backValue: "email or username already taken" });
  }

  function submit() {
    checkPassword();
      axios.post("http://localhost:8080/singUp", values).then(
        response => {
          if(JSON.stringify(values.backValue) === JSON.stringify(response.data)) {
            cogoToast.error('This username or email are already taken.');
          } else {
            cogoToast.success(' Thanks for joining us. You will receive a confirmation email in the following minutes.');
            console.log(values);
            history.push("/");
          }
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );

    }
  
  function checkPassword(){
    if (values.password.length === 0 || values.secPassword.length === 0) {
      cogoToast.error("Please insert a valid password.");
    }else if(!(values.password.localeCompare(values.secPassword)) === false) {
      cogoToast.error("Passwords do not match.");
>>>>>>> finalStage
    }
  }

  function checkBox(check: boolean) {
    if (check) {
      setCheck(false);
    } else {
      setCheck(true);
    }
    console.log(check);
  }

  return (
    <div className="container">
      <h1>Join the community</h1>
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
            <input type="checkbox" className="custom-control-input" id="defaultUnchecked" />
<<<<<<< HEAD
            <label className="custom-control-label" htmlFor="defaultUnchecked" onClick={()=>checkBox(check)}>I accept the terms and conditions</label>
=======
            <label className="custom-control-label" htmlFor="defaultUnchecked" onClick={() => checkBox(check)}>I accept the terms and conditions</label>
>>>>>>> finalStage
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

<<<<<<< HEAD
export default RegisterPage;
=======

>>>>>>> finalStage
