import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

function NoPosts() {
  return (
    <Container className="no-posts d-flex flex-column  align-items-center">
      <Alert className=" text-center alert-no-posts" variant="warning">
        Shish, I couldn't find anything. Give it
            <Link to="/dashboard"> another try?</Link>
      </Alert>
    </Container>
  );
}

export default NoPosts;