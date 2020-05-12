import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import cogoToast from "cogo-toast";
import { useParams } from "react-router";
export default function ChangePasswordPage() {

  const [password, setPassword] = useState({ password: "", secPassword: "" });
  const history = useHistory();
  const token = useParams();

  function handleChange(event: any) {
    const { name, value } = event.target;
    setPassword({
      ...password,
      [name]: value
    });

  }

  function handleSubmit(event: any) {
    event.preventDefault();
    /* axios.post(`http://localhost:8081/savePassword?token=${token}`, password.password).then(
      response => {
        console.log(response)
      },
      error => {
        console.log(error);
      }
    ) */
    cogoToast.success(' Your password was reset.');
    //history.push("/");
  }

  

  function submit() {
    if (!(password.password.localeCompare(password.secPassword)) === false) {
      cogoToast.error("Passwords do not match.");
    } else if (password.password.length === 0 || password.secPassword.length === 0) {
      cogoToast.error("Please insert a valid password.");
    }else{
      axios.post(`http://localhost:8081/savePassword?token=${token}`, password.password).then(
      response => {
        console.log(response)
        console.log(password.password)
      },
      error => {
        console.log(error);
      }
    )
    }
    console.log(password);      
    }
    
  

  return (
    <div className="container">
      <h1>Finish line ahead</h1>
      <Container className="formRecoveryPageContainer">
        <h2 className="border-bottom">Reset password</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              name="secPassword"
              value={password.secPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="loginBtn .btn-block"
            id="register-submit-btn"
            onClick={submit}
          >
            Submit
          </Button>{" "}
        </Form>
      </Container>
    </div>
  );


}
