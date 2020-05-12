import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function PasswordRecPage(){
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
  console.log(values);
  setValues({email: ""});
}

function submit() {
    axios.post(`http://localhost:8081/resetPassword?email=${values.email}`, values.email).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  return (
    <div className="containerRecPage">
      <h2>First, let's find your account</h2>
      <div id="recPage">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="validationCustomUsername">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="button" className="btn btn-success" onClick={submit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}