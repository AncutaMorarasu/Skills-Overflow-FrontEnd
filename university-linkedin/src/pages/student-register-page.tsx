import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";

import {
  Link
} from "react-router-dom";

export default function RegisterPage() {
  const [values, setValues] = useState({
    email: "",
    //userName: "",
    password: "",
    secPassword: "",
    firstName: "",
    lastName:"",
    description:"",
    phoneNumber:"",
    workExperience:"",
    education:"",
    skills:"",
    backValueEmail: "email already taken",
    //backValueUser: "username already taken"
  });
  const [check, setCheck] = useState(true);
  const history = useHistory();

  function handleChange(event: any) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    values.backValueEmail= "email already taken";
    //values.backValueUser= "username already taken";
  
  }

  function submit() {
    if (checkPassword()) {
      checkAndRegister();
    }
  }

  function checkAndRegister() {
    axios.post("http://localhost:8080/student/signUp", values).then(
      response => {
        console.log(response)
        if (JSON.stringify(values.backValueEmail) === JSON.stringify(response.data)) {
          cogoToast.error("This email is already taken.", { hideAfter: 5 });
          return;

        } else {
          cogoToast.success(" Thanks for joining us!", { hideAfter: 5 });
          history.push("/");
        }
      }, error => {
        console.log(error);
      }
    )
  };

  function checkPassword() {
    if (values.password.length === 0 || values.secPassword.length === 0 || values.email.length === 0 ||  values.lastName.length === 0 || values.firstName.length === 0 ) {
      cogoToast.error("Please fill in all the required fields.", { hideAfter: 5 });
      return false;
    } else if (values.password.length < 5 || values.secPassword.length < 5 || values.password.length > 20 || values.secPassword.length > 20) {
      cogoToast.error("Your password should contain at least 5 characters but no more than 20 characters.", { hideAfter: 5 });
      return false;
    } else if (!values.password.localeCompare(values.secPassword) === false) {
      cogoToast.error("Passwords do not match.", { hideAfter: 5 });
      return false;
    } else if (checkForSpaces()) {
      cogoToast.error("Your password must not contain white spaces.", { hideAfter: 5 });
      return false
    } else {
      return true;
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

  function checkForSpaces() {
    if (/\s/g.test(values.password) && /\s/g.test(values.secPassword)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="container">
      <h1>Join the community
      
      </h1>


      <Container className="formRegisterContainer">
        <h2 className="border-bottom">Register</h2>
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
          <Form.Group controlId="validationCustomUsername">
            <Form.Control
              type="firstName"
              placeholder="Enter your first name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="validationCustomUsername">
            <Form.Control
              type="lastName"
              placeholder="Enter your last name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
            />
            </Form.Group>
          <Form.Group controlId="validationCustomUsername">
            <Form.Control
              type="phoneNumber"
              placeholder="Enter your phone number"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="validationCustomUsername">
            <Form.Control
              type="workExperience"
              placeholder="Enter your work experience"
              name="workExperience"
              value={values.workExperience}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="validationCustomUsername">
            <Form.Control
              type="education"
              placeholder="Enter your education"
              name="education"
              value={values.education}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="validationCustomUsername">
            <Form.Control
              type="skills"
              placeholder="Enter your skills"
              name="skills"
              value={values.skills}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="validationCustomUsername">
            <Form.Control
              type="description"
              placeholder="Describe yourself"
              name="description"
              value={values.description}
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
            <input
              type="checkbox"
              className="custom-control-input"
              id="defaultUnchecked"
            />
            <label
              className="custom-control-label"
              htmlFor="defaultUnchecked"
              onClick={() => checkBox(check)}
            >
              I accept the terms and conditions
            </label>
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
