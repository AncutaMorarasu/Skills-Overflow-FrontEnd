import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

function SidenavAdmin() {
  return (
    <ListGroup className="nav flex-column sidenav">
      <ListGroup.Item variant="light" className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          admin dashboard
        </a>
        <div className="dropdown-menu dd-menu ">
          <Link
            to="/approved-profiles"
            className="dropdown-item dd-item border-bottom"
          >
            approved profiles
          </Link>
          <Link
            className="dropdown-item dd-item border-bottom "
            to="/account-requests"
          >
            account requests
          </Link>
          <Link
            className="dropdown-item dd-item border-bottom"
            to="/blocked-users"
          >
            blocked users
          </Link>
          <Link className="dropdown-item dd-item border-bottom" to="/declined-users">
            declined requests
          </Link>
          <Link className="dropdown-item dd-item border-bottom" to="/pending-questions">
            questions requests
          </Link>
          <Link className="dropdown-item dd-item" to="/pending-answers">
            answers requests
          </Link>
        </div>
      </ListGroup.Item>
      <ListGroup.Item variant="light" className="nav-item">
        <Link className="nav-link " to="/dashboard">
          questions dashboard
        </Link>
      </ListGroup.Item>
      <ListGroup.Item variant="light" className="nav-item">
        <a className="nav-link " href="#">
          users
        </a>

      </ListGroup.Item>
      <ListGroup.Item>
        <a className="nav-link " href="#">
          my profile
        </a>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default SidenavAdmin;
