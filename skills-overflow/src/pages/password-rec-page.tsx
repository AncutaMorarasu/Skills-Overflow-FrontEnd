import React from "react";
//import Button from "react-bootstrap/Button";

function PasswordRecPage() {
  return (
    <div className="containerRecPage">
      <h2 className="contentHeader">First, let's find your account</h2>
      <div className="recPage">
        <input
          id="input-char-counter"
          type="email"
          className="form-control"
          placeholder="Please enter your email address"
        />
        <button type="button" className="btn btn-success btn-rounded">
          Submit
        </button>
      </div>
    </div>
  );
}

export default PasswordRecPage;
