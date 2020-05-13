import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";

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
    console.log(values);
  }
  const history = useHistory();
  function submit() {
    axios
      .post(`http://localhost:8081/resetPassword?email=${values.email}`, values)
      .then(
        response => {
          console.log(response);
          cogoToast.success(
            "Check your inbox, instructions are on their way.",
            { hideAfter: 5 }
          );
          history.push("/");
        },
        error => {
          console.log(error);
        }
      );
    setValues({ email: "" });
  }

  return (
    <div className="containerRecPage">
      <h2>First, let's find your account</h2>
      <div id="recPage">
        <Form onSubmit={handleSubmit} className="recoveryForm">
          <Form.Group controlId="validationCustomUsername">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="rec_page_input"
            />
          </Form.Group>
          <Button
            type="button"
            className="btn btn-success passReset-btn"
            onClick={submit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
