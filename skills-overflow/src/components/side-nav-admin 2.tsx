import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
//import Link from "react-router-dom";

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
          <a className="dropdown-item dd-item border-bottom" href="#">
            user profiles
          </a>
          <a className="dropdown-item dd-item border-bottom " href="#">
            account requests
          </a>
          <a className="dropdown-item dd-item border-bottom" href="#">
            blocked users
          </a>
          <a className="dropdown-item dd-item" href="#">
            declined requests
          </a>
        </div>
      </ListGroup.Item>
      <ListGroup.Item variant="light" className="nav-item">
        <a className="nav-link " href="#">
          All questions
        </a>
      </ListGroup.Item>
      <ListGroup.Item variant="light" className="nav-item">
        <a className="nav-link " href="#">
          users
        </a>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default SidenavAdmin;
