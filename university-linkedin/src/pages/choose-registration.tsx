import React from "react";

import Student from '../assets/student.png'
import Company from '../assets/company.png'

import { Link } from "react-router-dom";

function Choose() {
  return (
    <div className="container">
      <h1>Register as a Student or Company?</h1>
      <Link to="/student/register">
        <img src={Student} alt="student" className="logo" />
      </Link>

      <Link to="/company/register">
        <img src={Company} alt="company" className="logo" />
      </Link>
    </div>
  );
}
export default Choose;
