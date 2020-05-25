import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Link, useLocation } from "react-router-dom";

function NoSearchResult() {

  //const {par} = props;
  const location = useLocation();
  const [par, setPar] = useState();

  useEffect(() => {
    const p = location.state;
    const par = (p as any) ?.par;

    console.log("location is --> " + par)
    setPar(par);
  })


  return (
    <Container className="no-posts d-flex flex-column  align-items-center">
      <Alert className=" text-center alert-no-posts" variant="warning">
        Couldn't find what you're looking for... Perhaps you meant
            <Link to="/dashboard" > {par} </Link>?
          </Alert>
    </Container>
  );
}

export default NoSearchResult;