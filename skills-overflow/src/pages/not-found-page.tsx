import React from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

function NotFoundPage() {
  return (
    <Container>
      <Alert className="text-center" variant="warning">
        Woops, there's nothing here!
      </Alert>
    </Container>
  );
}

export default NotFoundPage;
