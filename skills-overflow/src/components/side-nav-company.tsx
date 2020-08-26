import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

function SidenavUser() {
  return (
    <ListGroup className="nav flex-column sidenav">
      <ListGroup.Item variant="light" className="nav-item">
        <Link className="nav-link " to="/dashboard">
          Jobs dashboard
        </Link>
      </ListGroup.Item>

      <ListGroup.Item >
        <Link className="nav-link " to="/profile">
          job requests
        </Link>
      </ListGroup.Item>

      <ListGroup.Item >
        <Link className="nav-link " to="/profile">
          my profile
        </Link>
      </ListGroup.Item>

      <ListGroup.Item >
        <Link className="nav-link " to="/profile">
          news
        </Link>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default SidenavUser;
