import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";


export default function PasswordRecPage() {

  const [values, setValues] = useState({ email: "" });
  function handleChange(event: any) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    setValues({ email: '' });
    axios.post("localhost:8080", values).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
      setValues({email:''});
  }

  function submit(){
    console.log(values);
  }

  return (
    <div className="containerRecPage" >
      <Container className="formRecoveryContainer">
        <h2 className="border-bottom">Please enter your email to search for your account</h2>
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
          <Button
            variant="primary"
            type="submit"
            className="loginBtn .btn-block"
            onClick={submit}
          >
            Submit
          </Button>{" "}
          </Form>
          </Container>
    </div>
  );
}

