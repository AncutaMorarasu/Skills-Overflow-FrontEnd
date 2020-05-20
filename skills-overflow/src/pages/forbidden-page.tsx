import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";


function ForbiddenPage() {

  const history = useHistory();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    redirectUser();
    if(redirect){
      history.push("/dashboard")

    }
  })

  function redirectUser(){
    setTimeout(() => setRedirect(true), 5000)
  }

  function goBack(){
    history.push("/dashboard")
  }

    return (
      <div className="forbiden_container">
        <h1>We are sorry...</h1>
        <div className="forbiden__container">
          <h3>The page you're trying to access is restricted.</h3>
          <Button type="button" className="btn btn-default" onClick={goBack}>Go back</Button>
        </div>
      </div>
    );
  }
  
  export default ForbiddenPage;