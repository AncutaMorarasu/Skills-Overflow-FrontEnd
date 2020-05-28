import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
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
      <h2 className=" text-center alert-no-posts" >
        We couldn't find what you're looking for... Perhaps you meant
            <Link to="/dashboard" > {par} </Link>?
      </h2>
    </Container>
  );
};

export default NoSearchResult;