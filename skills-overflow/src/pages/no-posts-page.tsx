import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function NoPosts() {
  return (
    <Container className="no-posts d-flex flex-column  align-items-center">
      <h2 className=" text-center alert-no-posts" >
        Shish, we couldn't find anything. Give it
            <Link to="/dashboard"> another try?</Link>
      </h2>
    </Container>
  );
}

export default NoPosts;