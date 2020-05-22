import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

function SidenavUser() {
  return (
    <ListGroup className="nav flex-column sidenav">
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
      <ListGroup.Item >
        <a className="nav-link " href="#">
          my profile
        </a>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default SidenavUser;
