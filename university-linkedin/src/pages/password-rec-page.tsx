import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";

export default function PasswordRecPage() {
  const [values, setValues] = useState({ email: "", backEndValue: "No email found" });

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
    setValues({ email: "", backEndValue: "No email found" });

  }
  const history = useHistory();

  function submit() {
    if (values.email.length === 0) {
      cogoToast.error("Please complete the required field.", { hideAfter: 5 });
      return;
    } else {
      axios
        .post(`http://localhost:8081/resetPassword?email=${values.email}`, values)
        .then(
          response => {
            if (
              JSON.stringify(values.backEndValue) ===
              JSON.stringify(response.data)
            ) {
              cogoToast.error("This email is not in our database.");
              console.log(response);
              setValues({ email: "", backEndValue: "No email found" });


            } else {
              cogoToast.success(
                "Check your inbox, instructions are on their way.",
                { hideAfter: 5 }
              );
              history.push("/");
            }
          },
          error => {
            console.log(error);
          }
        );
    }
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
