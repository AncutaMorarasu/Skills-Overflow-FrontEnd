import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import cogoToast from "cogo-toast";
import { useParams } from "react-router";
export default function ChangePasswordPage() {
  const [password, setPassword] = useState({ password: "", secPassword: "" });
  const history = useHistory();
  const token: any = useParams();

  function handleChange(event: any) {
    const { name, value } = event.target;
    setPassword({
      ...password,
      [name]: value
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    setPassword({ password: "", secPassword: "" });
  }

  function submit() {
    let config = {
      headers: { "Content-Type": "application/json" }
    };

    if (checkPassword()) {
      axios
        .put(
          `http://localhost:8081/savePassword?token=${token.token}`,
          JSON.stringify(password),
          config
        )
        .then(
          response => {
            cogoToast.success(" Your password was reset.", { hideAfter: 5 });
            history.push("/");
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
    }
    
  }


  function checkPassword() {
    if (password.password.length === 0 || password.secPassword.length === 0 ) {
      cogoToast.error("Please insert a valid password.", { hideAfter: 5 });
      return false;
    }  else if (password.password.length < 5 || password.secPassword.length < 5 || password.password.length > 20 || password.secPassword.length > 20) {
      cogoToast.error("Your password should containt at least 5 characters but no more than 20 characters.", { hideAfter: 5 });
      return false;
    } else if (!password.password.localeCompare(password.secPassword) === false) {
      cogoToast.error("Passwords do not match.", { hideAfter: 5 });
      return false;
    } else if (checkForSpaces()) {
      cogoToast.error("Your password must not contain white spaces.", { hideAfter: 5 });
      return false
    } else {
      return true;
    }
  }

  function checkForSpaces() {
    if (/\s/g.test(password.password) && /\s/g.test(password.secPassword)) {
      return true;
    } else {
      return false;
    }
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
