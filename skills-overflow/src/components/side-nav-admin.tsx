import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

function SidenavAdmin() {
  return (
    <ListGroup className="nav flex-column sidenav">

      <ListGroup.Item>
        <Link className="nav-link " to="/admin/students">
          Students
        </Link>
      </ListGroup.Item>

      <ListGroup.Item>
        <Link className="nav-link " to="/admin/companies">
          companies
        </Link>
      </ListGroup.Item>

   
      <ListGroup.Item>
        <Link className="nav-link " to="/admin/approvedjobs">
          approved jobs
        </Link>
      </ListGroup.Item>

      <ListGroup.Item>
        <Link className="nav-link " to="/admin/unapprovedjobs">
          unapproved jobs
        </Link>
      </ListGroup.Item>
   
   
    
      <ListGroup.Item>
        <Link className="nav-link " to="/admin/news">
          news
        </Link>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default SidenavAdmin;
